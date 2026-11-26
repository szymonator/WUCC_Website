const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CACHE_DIR = '/app/data/ig_cache';
const SYNC_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 hours
const TOKEN_REFRESH_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const TOKEN_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // 1 day
const MAX_POSTS = 16;

let isSyncing = false;

function hashString(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function sanitizeId(id) {
  return String(id || '').replace(/[^a-zA-Z0-9_-]/g, '');
}

function initInstagram(db) {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  db.prepare(`
    CREATE TABLE IF NOT EXISTS ig_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS ig_posts (
      id TEXT PRIMARY KEY,
      permalink TEXT NOT NULL,
      caption TEXT,
      media_type TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      position INTEGER NOT NULL
    )
  `).run();

  const getConfigStmt = db.prepare('SELECT value, updated_at FROM ig_config WHERE key = ?');
  const setConfigStmt = db.prepare(`
    INSERT INTO ig_config (key, value, updated_at)
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `);
  const deleteConfigStmt = db.prepare('DELETE FROM ig_config WHERE key = ?');

  function getConfig(key) {
    return getConfigStmt.get(key);
  }

  function setConfig(key, value) {
    setConfigStmt.run(key, String(value), Date.now());
  }

  // Adopt IG_ACCESS_TOKEN from env if newly provided or changed
  const envToken = (process.env.IG_ACCESS_TOKEN || '').trim();
  if (envToken) {
    const envHash = hashString(envToken);
    const storedHash = getConfig('token_env_hash');
    if (!storedHash || storedHash.value !== envHash) {
      setConfig('access_token', envToken);
      setConfig('token_env_hash', envHash);
      setConfig('token_refreshed_at', Date.now());
      deleteConfigStmt.run('ig_user_id');
      console.log('Instagram: Loaded new access token from environment.');
    }
  }

  async function discoverIgUserId(token) {
    const envUserId = (process.env.IG_USER_ID || '').trim();
    if (envUserId) {
      setConfig('ig_user_id', envUserId);
      return envUserId;
    }

    const cached = getConfig('ig_user_id');
    if (cached && cached.value) {
      return cached.value;
    }

    // 1. Try Unified Login (SUAT): me/assigned_instagram_accounts
    const assignedUrl = `https://graph.facebook.com/v21.0/me/assigned_instagram_accounts?fields=id,username&access_token=${encodeURIComponent(token)}`;
    const assignedRes = await fetch(assignedUrl);
    const assignedData = await assignedRes.json();
    if (assignedRes.ok && Array.isArray(assignedData.data) && assignedData.data.length > 0) {
      const account = assignedData.data[0];
      setConfig('ig_user_id', account.id);
      if (account.username) {
        setConfig('ig_username', account.username);
      }
      console.log(`Instagram: Discovered Unified Login account @${account.username || account.id}`);
      return account.id;
    }

    // 2. Try Facebook Pages -> instagram_business_account
    const accountsUrl = `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,instagram_business_account{id,username}&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(accountsUrl);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Facebook Graph API error (${res.status}): assigned=${JSON.stringify(assignedData)} | accounts=${JSON.stringify(data)}`);
    }

    if (Array.isArray(data.data)) {
      for (const page of data.data) {
        if (page.instagram_business_account && page.instagram_business_account.id) {
          const igId = page.instagram_business_account.id;
          setConfig('ig_user_id', igId);
          if (page.instagram_business_account.username) {
            setConfig('ig_username', page.instagram_business_account.username);
          }
          console.log(`Instagram: Discovered business account @${page.instagram_business_account.username || igId}`);
          return igId;
        }
      }
    }

    throw new Error(`No Instagram account found for token. assigned_instagram_accounts=${JSON.stringify(assignedData)}, me/accounts=${JSON.stringify(data)}`);
  }

  async function fetchMediaFromApi(token) {
    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

    if (token.startsWith('IG')) {
      const url = `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=${MAX_POSTS}&access_token=${encodeURIComponent(token)}`;
      const res = await fetch(url);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Instagram API error (${res.status}): ${errText}`);
      }
      return res.json();
    }

    // Meta Graph API token (EAA...)
    const igUserId = await discoverIgUserId(token);
    const url = `https://graph.facebook.com/v21.0/${encodeURIComponent(igUserId)}/media?fields=${fields}&limit=${MAX_POSTS}&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Facebook Graph API error (${res.status}): ${errText}`);
    }
    return res.json();
  }

  async function downloadImage(url, destPath) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to download media (${res.status})`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const tmpPath = `${destPath}.tmp`;
    fs.writeFileSync(tmpPath, buffer);
    fs.renameSync(tmpPath, destPath);
  }

  async function syncFeed() {
    if (isSyncing) return { synced: false, reason: 'already_syncing' };
    const tokenRow = getConfig('access_token');
    if (!tokenRow || !tokenRow.value) {
      return { synced: false, reason: 'no_token' };
    }

    isSyncing = true;
    try {
      const data = await fetchMediaFromApi(tokenRow.value);
      const items = Array.isArray(data.data) ? data.data.slice(0, MAX_POSTS) : [];
      if (items.length === 0) {
        console.warn('Instagram: API returned 0 posts.');
        return { synced: false, reason: 'empty_response' };
      }

      const validPosts = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const safeId = sanitizeId(item.id);
        if (!safeId) continue;

        const imgSrc = item.media_type === 'VIDEO'
          ? (item.thumbnail_url || item.media_url)
          : (item.media_url || item.thumbnail_url);

        if (!imgSrc) continue;

        const destPath = path.join(CACHE_DIR, `${safeId}.jpg`);
        try {
          await downloadImage(imgSrc, destPath);
          validPosts.push({
            id: safeId,
            permalink: item.permalink || 'https://www.instagram.com/warwickclimbing/',
            caption: item.caption || '',
            media_type: item.media_type || 'IMAGE',
            timestamp: item.timestamp || '',
            position: validPosts.length
          });
        } catch (dlErr) {
          console.error(`Instagram: Failed to cache image for post ${safeId}:`, dlErr.message);
        }
      }

      if (validPosts.length > 0) {
        const replacePosts = db.transaction((posts) => {
          db.prepare('DELETE FROM ig_posts').run();
          const insertStmt = db.prepare(`
            INSERT INTO ig_posts (id, permalink, caption, media_type, timestamp, position)
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          for (const p of posts) {
            insertStmt.run(p.id, p.permalink, p.caption, p.media_type, p.timestamp, p.position);
          }
        });
        replacePosts(validPosts);
        setConfig('last_sync_at', Date.now());

        // Clean up stale images no longer in the latest 16
        const activeFiles = new Set(validPosts.map(p => `${p.id}.jpg`));
        for (const file of fs.readdirSync(CACHE_DIR)) {
          if (file.endsWith('.jpg') && !activeFiles.has(file)) {
            fs.unlinkSync(path.join(CACHE_DIR, file));
          }
        }
        console.log(`Instagram: Synced ${validPosts.length} posts.`);
      }

      return { synced: true, count: validPosts.length };
    } catch (err) {
      console.error('Instagram sync error:', err.message);
      return { synced: false, error: err.message };
    } finally {
      isSyncing = false;
    }
  }

  async function refreshTokenIfNeeded() {
    const tokenRow = getConfig('access_token');
    if (!tokenRow || !tokenRow.value) return;

    const refreshedRow = getConfig('token_refreshed_at');
    const lastRefreshed = refreshedRow ? Number(refreshedRow.value) : 0;
    if (Date.now() - lastRefreshed < TOKEN_REFRESH_AGE_MS) {
      return;
    }

    const token = tokenRow.value;
    try {
      if (token.startsWith('IG')) {
        const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && data.access_token) {
          setConfig('access_token', data.access_token);
          setConfig('token_refreshed_at', Date.now());
          console.log('Instagram: Refreshed IG long-lived token.');
        } else {
          console.warn('Instagram: IG token refresh failed:', data);
        }
      } else if (process.env.IG_APP_ID && process.env.IG_APP_SECRET) {
        const url = `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${encodeURIComponent(process.env.IG_APP_ID)}&client_secret=${encodeURIComponent(process.env.IG_APP_SECRET)}&fb_exchange_token=${encodeURIComponent(token)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && data.access_token) {
          setConfig('access_token', data.access_token);
          setConfig('token_refreshed_at', Date.now());
          console.log('Instagram: Refreshed Meta Graph API token.');
        } else {
          console.warn('Instagram: Meta token refresh failed:', data);
        }
      }
    } catch (err) {
      console.error('Instagram: Error refreshing token:', err.message);
    }
  }

  function getCachedPosts() {
    const rows = db.prepare('SELECT id, permalink, caption, media_type, timestamp FROM ig_posts ORDER BY position ASC').all();
    const lastSync = getConfig('last_sync_at');
    const username = getConfig('ig_username');
    return {
      username: username ? username.value : 'warwickclimbing',
      updatedAt: lastSync ? new Date(Number(lastSync.value)).toISOString() : null,
      posts: rows.map(row => ({
        id: row.id,
        permalink: row.permalink,
        caption: row.caption,
        media_type: row.media_type,
        timestamp: row.timestamp,
        imageUrl: `/api/instagram/media/${row.id}.jpg`
      }))
    };
  }

  // Schedule initial sync (only if cache is empty or stale) and periodic intervals
  setTimeout(() => {
    refreshTokenIfNeeded().then(() => {
      const countRow = db.prepare('SELECT COUNT(*) AS cnt FROM ig_posts').get();
      const lastSync = getConfig('last_sync_at');
      const isStale = !lastSync || (Date.now() - Number(lastSync.value) >= SYNC_INTERVAL_MS);
      if (!countRow || countRow.cnt === 0 || isStale) {
        return syncFeed();
      }
      console.log('Instagram: Using fresh SQLite cache on startup.');
    });
  }, 2000);

  const syncTimer = setInterval(syncFeed, SYNC_INTERVAL_MS);
  const tokenTimer = setInterval(refreshTokenIfNeeded, TOKEN_CHECK_INTERVAL_MS);
  syncTimer.unref();
  tokenTimer.unref();

  return {
    syncFeed,
    getCachedPosts,
    getMediaFilePath(filename) {
      if (!/^[a-zA-Z0-9_-]+\.jpg$/.test(filename)) return null;
      const fullPath = path.join(CACHE_DIR, filename);
      return fs.existsSync(fullPath) ? fullPath : null;
    }
  };
}

module.exports = { initInstagram };
