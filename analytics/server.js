const http = require('http');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const PORT = 3000;
const DB_DIR = '/app/data';
const DB_FILE = path.join(DB_DIR, 'analytics.db');

// Read admin password from environment (default fallback provided for safety)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wucc-admin-password';
if (!process.env.ADMIN_PASSWORD) {
  console.warn('WARNING: ADMIN_PASSWORD environment variable not set. Falling back to default.');
}

// Ensure DB directory exists
const fs = require('fs');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize SQLite database
const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');

// Ensure tables exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS daily_page_views (
    path TEXT NOT NULL,
    visit_date TEXT NOT NULL,
    views INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (path, visit_date)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS active_sessions (
    token TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL
  )
`).run();

// State for daily in-memory deduplication (GDPR compliant)
let currentDay = new Date().toISOString().split('T')[0];
let currentSalt = crypto.randomBytes(16).toString('hex');
let dailyHashes = new Set(); // Stores "sha256(IP + UA + Date + Salt + Path)"

function rotateSaltIfNeeded() {
  const today = new Date().toISOString().split('T')[0];
  if (today !== currentDay) {
    currentDay = today;
    currentSalt = crypto.randomBytes(16).toString('hex');
    dailyHashes.clear(); // Free memory immediately, preventing leaks
    console.log('Rotated salt and purged memory hashes for new day');
  }
}

// Rate Limiter Configuration for Logins
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

// Prune rate limit attempts map every 30 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, attempt] of loginAttempts.entries()) {
    if (now > attempt.resetTime) {
      loginAttempts.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// Helper to extract cookies from request headers
function getCookie(req, name) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, ...value] = cookie.split('=');
    acc[key.trim()] = value.join('=').trim();
    return acc;
  }, {});
  return cookies[name] || null;
}

// Timing-Safe Password Comparison (hashes to normalize string length differences)
function isPasswordCorrect(inputPassword) {
  if (!inputPassword || typeof inputPassword !== 'string') {
    return false;
  }
  const inputHash = crypto.createHash('sha256').update(inputPassword).digest();
  const adminHash = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  return crypto.timingSafeEqual(inputHash, adminHash);
}

// SQLite Prepared Statements
const incrementViewStmt = db.prepare(`
  INSERT INTO daily_page_views (path, visit_date, views)
  VALUES (?, ?, 1)
  ON CONFLICT(path, visit_date) DO UPDATE SET views = views + 1
`);

const getViewStmt = db.prepare(`
  SELECT SUM(views) as views 
  FROM daily_page_views 
  WHERE path = ?
`);

const getRangeStatsStmt = db.prepare(`
  SELECT path, SUM(views) as views 
  FROM daily_page_views 
  WHERE visit_date >= ? AND visit_date <= ? 
  GROUP BY path 
  ORDER BY views DESC
`);

// Session DB prepared statements
const insertSessionStmt = db.prepare(`
  INSERT INTO active_sessions (token, created_at)
  VALUES (?, ?)
`);

const deleteSessionStmt = db.prepare(`
  DELETE FROM active_sessions WHERE token = ?
`);

const checkSessionStmt = db.prepare(`
  SELECT 1 FROM active_sessions 
  WHERE token = ? AND created_at >= ?
`);

const pruneSessionsStmt = db.prepare(`
  DELETE FROM active_sessions WHERE created_at < ?
`);

const capSessionsStmt = db.prepare(`
  DELETE FROM active_sessions WHERE token NOT IN (
    SELECT token FROM active_sessions ORDER BY created_at DESC LIMIT 100
  )
`);

function isSessionValid(req) {
  const token = getCookie(req, 'wucc_session');
  if (!token) return false;
  const minCreatedTime = Date.now() - 24 * 60 * 60 * 1000; // 24 hours expiry
  return checkSessionStmt.get(token, minCreatedTime) !== undefined;
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // 1. PUBLIC ENDPOINT: Page View tracking beacon
  if (url.pathname === '/track' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        let pagePath = payload.path;

        // Path validation and sanitization
        if (
          !pagePath ||
          typeof pagePath !== 'string' ||
          pagePath.length > 100 ||
          !pagePath.startsWith('/') ||
          !/^\/[a-zA-Z0-9\/\-_\.]*$/.test(pagePath)
        ) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid path' }));
          return;
        }

        // Normalize pagePath (strip trailing slashes except for root /)
        if (pagePath.length > 1 && pagePath.endsWith('/')) {
          pagePath = pagePath.slice(0, -1);
        }

        rotateSaltIfNeeded();

        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
        const ua = req.headers['user-agent'] || 'unknown';

        // Generate daily salt hash (GDPR compliant)
        const hashInput = `${ip}-${ua}-${currentDay}-${currentSalt}-${pagePath}`;
        const hash = crypto.createHash('sha256').update(hashInput).digest('hex');

        const isNewVisit = !dailyHashes.has(hash);

        if (isNewVisit) {
          dailyHashes.add(hash);
          incrementViewStmt.run(pagePath, currentDay);
        }

        const currentViews = getViewStmt.get(pagePath)?.views || 0;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, isNew: isNewVisit, views: currentViews }));
      } catch (err) {
        console.error('Error tracking visit:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
    return;
  }

  // 2. AUTH ENDPOINT: Log In (Rate-limited, timing-safe comparison, DB sessions)
  if (url.pathname === '/login' && req.method === 'POST') {
    // Extract real IP behind Nginx proxy safely
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Check rate limiting state for IP
    const attempt = loginAttempts.get(ip) || { count: 0, resetTime: now + LOCKOUT_MS };

    if (attempt.count >= MAX_ATTEMPTS && now < attempt.resetTime) {
      res.writeHead(429, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Too many login attempts. Lockout active for 15 minutes.' }));
      return;
    }

    // Reset lockout window if elapsed
    if (now > attempt.resetTime) {
      attempt.count = 0;
      attempt.resetTime = now + LOCKOUT_MS;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const password = payload.password;

        if (isPasswordCorrect(password)) {
          // Success: Clear the IP's fail records
          loginAttempts.delete(ip);

          // Generate session token
          const token = crypto.randomBytes(32).toString('hex');
          
          // Clean up expired sessions & insert session into SQLite
          pruneSessionsStmt.run(Date.now() - 24 * 60 * 60 * 1000);
          insertSessionStmt.run(token, Date.now());
          capSessionsStmt.run(); // Cap active sessions at 100 to prevent DoS bloat

          // Set cookie valid for 24 hours
          res.setHeader('Set-Cookie', `wucc_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } else {
          // Failure: Increment fails and update limiter Map
          attempt.count += 1;
          loginAttempts.set(ip, attempt);

          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Incorrect password' }));
        }
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad request' }));
      }
    });
    return;
  }

  // 3. AUTH ENDPOINT: Log Out
  if (url.pathname === '/logout' && req.method === 'POST') {
    const token = getCookie(req, 'wucc_session');
    if (token) {
      deleteSessionStmt.run(token);
    }
    res.setHeader('Set-Cookie', 'wucc_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // 4. AUTH ENDPOINT: Nginx auth_request checker
  if (url.pathname === '/auth-check' && req.method === 'GET') {
    if (isSessionValid(req)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ authenticated: true }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
    }
    return;
  }

  // 5. SECURED ENDPOINT: Fetch stats list (requires active session cookie)
  if (url.pathname === '/stats' && req.method === 'GET') {
    if (!isSessionValid(req)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }

    try {
      let start = url.searchParams.get('start');
      let end = url.searchParams.get('end');

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      if (!end || !dateRegex.test(end)) {
        end = new Date().toISOString().split('T')[0];
      }

      if (!start || !dateRegex.test(start)) {
        const endDateObj = new Date(end);
        const startDateObj = new Date(endDateObj.getTime() - 30 * 24 * 60 * 60 * 1000);
        start = startDateObj.toISOString().split('T')[0];
      }

      const stats = getRangeStatsStmt.all(start, end);

      const result = {};
      for (const row of stats) {
        result[row.path] = row.views;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        stats: result,
        start,
        end
      }));
    } catch (err) {
      console.error('Error fetching stats:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Server error' }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

// Graceful shutdown handling
function shutdown() {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    try {
      db.close();
      console.log('Database connection closed.');
    } catch (err) {
      console.error('Error closing database:', err);
    }
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 5000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Analytics API server running on port ${PORT}`);
});
