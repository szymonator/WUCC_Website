document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');

  // Preloader fadeout
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const fadeOut = () => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    };

    if (document.readyState === 'complete') {
      fadeOut();
    } else {
      window.addEventListener('load', fadeOut);
    }
  }

  // Dynamic copyright year loader
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Sticky Header scroll handling (throttled via rAF)
  let scrollTicking = false;
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    }
    scrollTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(handleScroll);
      scrollTicking = true;
    }
  });
  handleScroll(); // Initial check on load

  // Set active nav item based on current URL path (segment-boundary matching)
  const normalizePath = (p) => p.endsWith('/') ? p : p + '/';
  const currentPath = normalizePath(window.location.pathname);
  const navLinks = document.querySelectorAll('.site-header .nav-link, .site-header .dropdown-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const normalizedHref = normalizePath(href);
    const isMatch = (normalizedHref === '/' && currentPath === '/') || 
                    (normalizedHref !== '/' && currentPath.startsWith(normalizedHref));
    if (isMatch) {
      link.classList.add('active');
      if (link.classList.contains('dropdown-item')) {
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          parentDropdown.querySelector('.nav-link')?.classList.add('active');
        }
      }
    }
  });



  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (event) => {
    const siteNavigation = document.getElementById('siteNavigation');
    const toggler = document.querySelector('.navbar-toggler');
    if (siteNavigation && toggler) {
      const isOpen = siteNavigation.classList.contains('show');
      if (isOpen && !siteNavigation.contains(event.target) && !toggler.contains(event.target)) {
        toggler.click();
      }
    }
  });

  // Make the entire adventure card clickable
  const adventureCards = document.querySelectorAll('.adventure-card');
  adventureCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Check if click was not on the link itself (to let the browser handle natural hrefs)
      if (e.target.tagName !== 'A' && !e.target.closest('a')) {
        const link = card.querySelector('a');
        if (link) {
          const href = link.getAttribute('href');
          if (href) {
            window.location.href = href;
          }
        }
      }
    });
  });
});
