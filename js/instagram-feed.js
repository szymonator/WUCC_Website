/**
 * Self-hosted 4x4 Instagram Feed Displayer for WUCC
 * Fetches cached posts from /api/instagram (served by analytics-api).
 */
(function () {
  'use strict';

  var PROFILE_URL = 'https://www.instagram.com/warwickclimbing/';
  var MAX_POSTS = 16;

  function renderHeader(container, username) {
    var handle = '@' + (username || 'warwickclimbing');
    var header = document.createElement('div');
    header.className = 'ig-feed-header';

    var brand = document.createElement('a');
    brand.className = 'ig-feed-brand';
    brand.href = PROFILE_URL;
    brand.target = '_blank';
    brand.rel = 'noopener noreferrer';

    var icon = document.createElement('i');
    icon.className = 'fa-brands fa-instagram';
    icon.setAttribute('aria-hidden', 'true');

    var handleSpan = document.createElement('span');
    handleSpan.className = 'ig-feed-handle';
    handleSpan.textContent = handle;

    brand.appendChild(icon);
    brand.appendChild(handleSpan);

    var followBtn = document.createElement('a');
    followBtn.className = 'ig-follow-btn';
    followBtn.href = PROFILE_URL;
    followBtn.target = '_blank';
    followBtn.rel = 'noopener noreferrer';

    var btnIcon = document.createElement('i');
    btnIcon.className = 'fa-brands fa-instagram';
    btnIcon.setAttribute('aria-hidden', 'true');
    followBtn.appendChild(btnIcon);
    followBtn.appendChild(document.createTextNode(' Follow on Instagram'));

    header.appendChild(brand);
    header.appendChild(followBtn);
    container.appendChild(header);
  }

  function renderSkeleton(grid) {
    for (var i = 0; i < MAX_POSTS; i++) {
      var skel = document.createElement('div');
      skel.className = 'ig-skeleton';
      skel.setAttribute('aria-hidden', 'true');
      grid.appendChild(skel);
    }
  }

  function renderFallback(wrapper) {
    var box = document.createElement('div');
    box.className = 'ig-fallback';

    var text = document.createElement('p');
    text.textContent = 'Check out our latest climbs, trips, and socials on Instagram.';

    var btn = document.createElement('a');
    btn.className = 'ig-follow-btn';
    btn.href = PROFILE_URL;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.textContent = 'View @warwickclimbing on Instagram';

    box.appendChild(text);
    box.appendChild(btn);
    wrapper.appendChild(box);
  }

  function buildPostCard(post) {
    var link = document.createElement('a');
    link.className = 'ig-card';
    link.href = post.permalink || PROFILE_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    var cleanCaption = (post.caption || '').trim();
    var altText = cleanCaption
      ? cleanCaption.slice(0, 120) + (cleanCaption.length > 120 ? '...' : '')
      : 'Warwick University Climbing Club Instagram post';
    link.setAttribute('aria-label', altText);

    var img = document.createElement('img');
    img.className = 'ig-card-img';
    img.src = post.imageUrl;
    img.alt = altText;
    img.width = 400;
    img.height = 500;
    img.loading = 'lazy';
    img.setAttribute('fetchpriority', 'low');
    link.appendChild(img);

    if (post.media_type === 'VIDEO' || post.media_type === 'CAROUSEL_ALBUM') {
      var badge = document.createElement('span');
      badge.className = 'ig-card-badge';
      badge.setAttribute('aria-hidden', 'true');
      var badgeIcon = document.createElement('i');
      badgeIcon.className = post.media_type === 'VIDEO' ? 'fa-solid fa-play' : 'fa-solid fa-clone';
      badge.appendChild(badgeIcon);
      link.appendChild(badge);
    }

    if (cleanCaption) {
      var overlay = document.createElement('div');
      overlay.className = 'ig-card-overlay';
      var p = document.createElement('p');
      p.className = 'ig-card-caption';
      p.textContent = cleanCaption;
      overlay.appendChild(p);
      link.appendChild(overlay);
    }

    return link;
  }

  function initFeed(mountEl) {
    var wrapper = document.createElement('div');
    wrapper.className = 'ig-feed-wrapper';

    renderHeader(wrapper, 'warwickclimbing');

    var grid = document.createElement('div');
    grid.className = 'ig-grid';
    renderSkeleton(grid);
    wrapper.appendChild(grid);

    mountEl.innerHTML = '';
    mountEl.appendChild(wrapper);

    fetch('/api/instagram')
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        var posts = Array.isArray(data.posts) ? data.posts.slice(0, MAX_POSTS) : [];
        if (posts.length === 0) {
          grid.remove();
          renderFallback(wrapper);
          return;
        }
        grid.innerHTML = '';
        for (var i = 0; i < posts.length; i++) {
          grid.appendChild(buildPostCard(posts[i]));
        }
      })
      .catch(function () {
        grid.remove();
        renderFallback(wrapper);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var containers = document.querySelectorAll('.wucc-instagram-feed');
    for (var i = 0; i < containers.length; i++) {
      initFeed(containers[i]);
    }
  });
})();
