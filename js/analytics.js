/**
 * WUCC GDPR-Compliant Google Analytics and Cookie Consent Controller
 * Target Measurement ID: G-EWGHGG4SHV
 */

(function () {
  const CONSENT_KEY = 'wucc_cookie_consent';
  const GA_MEASUREMENT_ID = 'G-EWGHGG4SHV';

  // Safe localStorage wrapper — prevents errors in strict privacy modes
  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* silently fail */ }
  }



  // Helper to log a custom GA event
  function trackEvent(eventName, params = {}) {
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  }

  // Set up event delegation for analytics tracking of interactive elements
  function setupEventTracking() {
    if (window.wuccEventTrackingInitialized) return;
    window.wuccEventTrackingInitialized = true;

    document.body.addEventListener('click', function (e) {
      // Find closest anchor tag
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href') || '';
        
        // 1. Mailto Link Tracking
        if (href.startsWith('mailto:')) {
          trackEvent('click_contact_email', {
            email: href.replace('mailto:', ''),
            page_path: window.location.pathname
          });
          return;
        }

        // 2. Outbound Link Tracking
        try {
          const url = new URL(link.href);
          if (url.hostname !== window.location.hostname) {
            trackEvent('click_outbound_link', {
              link_url: link.href,
              link_domain: url.hostname,
              page_path: window.location.pathname
            });
          }
        } catch (err) {
          // Invalid URL or relative path, ignore
        }
      }

      // 3. FAQ / Steps Accordion Tracking
      const accordionTrigger = e.target.closest('.faq-trigger, .step-trigger');
      if (accordionTrigger) {
        const titleText = accordionTrigger.innerText.trim();
        const type = accordionTrigger.classList.contains('faq-trigger') ? 'faq' : 'step';
        trackEvent('toggle_accordion', {
          accordion_type: type,
          accordion_title: titleText,
          page_path: window.location.pathname
        });
      }
    });
  }

  // 2. Load Google Analytics scripts dynamically
  function initGoogleAnalytics() {
    if (document.getElementById('google-analytics-script')) {
      setupEventTracking();
      return;
    }

    // Load gtag.js
    const script = document.createElement('script');
    script.id = 'google-analytics-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    setupEventTracking();
  }

  // 3. Inject cookie banner modal
  function showCookieBanner() {
    // If banner already exists or preference is already set, do not show it
    if (document.getElementById('wuccCookieBanner') || storageGet(CONSENT_KEY)) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'wuccCookieBanner';
    banner.className = 'wucc-cookie-banner';
    banner.innerHTML = `
      <div class="wucc-cookie-header">
        <i class="fa fa-info-circle" aria-hidden="true"></i>
        <h4 class="wucc-cookie-title">Help Us Plan Better Events!</h4>
      </div>
      <p class="wucc-cookie-text">
        We use anonymous Google Analytics to see which resources, blogs, and events are most popular so we can plan for the best member experience. We anonymise all data and <strong>never</strong> sell it to third parties. Learn more in our <a href="/privacy/">Privacy Policy</a>.
      </p>
      <div class="wucc-cookie-buttons">
        <button class="wucc-cookie-link-decline" id="wuccCookieDecline">Decline</button>
        <button class="wucc-cookie-btn wucc-cookie-btn-accept" id="wuccCookieAccept">Accept</button>
      </div>
    `;

    document.body.appendChild(banner);

    // Fade in banner with slide-up
    setTimeout(() => {
      banner.classList.add('is-visible');
    }, 1000);

    // Button event listeners
    const btnAccept = document.getElementById('wuccCookieAccept');
    const btnDecline = document.getElementById('wuccCookieDecline');

    btnAccept.addEventListener('click', function () {
      storageSet(CONSENT_KEY, 'accepted');
      initGoogleAnalytics();
      dismissBanner();
      updatePrivacyPageDashboard();
    });

    btnDecline.addEventListener('click', function () {
      storageSet(CONSENT_KEY, 'declined');
      dismissBanner();
      updatePrivacyPageDashboard();
    });

    function dismissBanner() {
      banner.classList.remove('is-visible');
      // Wait for slide-down animation to complete before removing element
      setTimeout(() => {
        banner.remove();
      }, 400);
    }
  }

  // 4. Privacy Page Preference Management Dashboard
  function updatePrivacyPageDashboard() {
    const container = document.getElementById('cookie-consent-settings');
    if (!container) return;

    const currentConsent = storageGet(CONSENT_KEY);
    let statusClass = 'status-unset';
    let statusText = 'Not Selected Yet (Undecided)';
    let statusDescription = 'Please choose whether you want to enable or disable Google Analytics tracking on your browser below.';

    if (currentConsent === 'accepted') {
      statusClass = 'status-accepted';
      statusText = 'Accepted (Opted In)';
      statusDescription = 'Google Analytics tracking is active on this browser. We appreciate your consent in helping us improve the website!';
    } else if (currentConsent === 'declined') {
      statusClass = 'status-declined';
      statusText = 'Declined (Opted Out)';
      statusDescription = 'Google Analytics tracking is disabled on this browser. We respect your choice, and no analytical data is being tracked.';
    }

    container.innerHTML = `
      <div class="wucc-consent-card">
        <h3>Cookie Preferences & Tracking</h3>
        <p>We respect your privacy. Under the General Data Protection Regulation (GDPR), you have the right to manage your tracking preferences. Below is your current status for Google Analytics on this device:</p>
        
        <div>
          <span style="font-size: 14px; font-weight: 600; display: block; margin-bottom: 6px;">Current Consent State:</span>
          <div class="wucc-consent-status-box ${statusClass}">${statusText}</div>
        </div>
        
        <p>${statusDescription}</p>
        
        <div class="wucc-cookie-buttons" style="justify-content: flex-start;">
          <button class="wucc-cookie-btn wucc-cookie-btn-accept" id="wuccDashboardOptIn">Accept / Opt-In</button>
          <button class="wucc-cookie-btn wucc-cookie-btn-decline" id="wuccDashboardOptOut">Decline / Opt-Out</button>
        </div>
      </div>
    `;

    // Add event listeners to dashboard buttons
    document.getElementById('wuccDashboardOptIn').addEventListener('click', function () {
      storageSet(CONSENT_KEY, 'accepted');
      initGoogleAnalytics();
      updatePrivacyPageDashboard();
    });

    document.getElementById('wuccDashboardOptOut').addEventListener('click', function () {
      storageSet(CONSENT_KEY, 'declined');
      updatePrivacyPageDashboard();
      alert('Your preference has been set to declined. You may need to reload the page to clear any existing active third-party cookies.');
    });
  }

  // Cookieless GDPR-compliant page tracking
  function trackPageView() {
    let pagePath = window.location.pathname;
    // Normalize pagePath (strip trailing slashes except for root /)
    if (pagePath.length > 1 && pagePath.endsWith('/')) {
      pagePath = pagePath.slice(0, -1);
    }
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: pagePath })
    }).catch(err => {
      console.warn('Analytics tracking failed:', err);
    });
  }

  // 5. Main Execution Flow
  function initialize() {
    // Unconditionally trigger cookieless page view tracking
    trackPageView();

    const consent = storageGet(CONSENT_KEY);

    if (consent === 'accepted') {
      initGoogleAnalytics();
    } else if (consent === null) {
      // Show consent banner to new users
      showCookieBanner();
    }

    // Always run the privacy page dashboard update, in case user is viewing the Privacy page
    updatePrivacyPageDashboard();
  }

  // Run on initialization
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
  }
})();
