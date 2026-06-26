document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navClose = document.querySelector('.mobile-nav-close');
  const navigation = document.getElementById('siteNavigation');
  const dropdownToggles = document.querySelectorAll('.nav-item.has-dropdown > .dropdown-toggle');

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

  // 1. Sticky Header scroll handling
  const handleScroll = () => {
    if (window.scrollY > 0) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  // 2. Mobile Nav Drawer open/close
  if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
      navigation.classList.add('is-active');
      navToggle.setAttribute('aria-expanded', 'true');
    });
  }

  if (navClose && navigation) {
    navClose.addEventListener('click', () => {
      navigation.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Close menu drawer when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (navigation && navigation.classList.contains('is-active')) {
      if (!navigation.contains(e.target) && !navToggle.contains(e.target)) {
        navigation.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // 3. Mobile Dropdown toggle on link click (only under 992px width)
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault(); // Prevent navigating to href="#"
        const dropdown = toggle.nextElementSibling;
        const isExpanded = dropdown.classList.contains('is-expanded');

        // Close all dropdowns first
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          d.classList.remove('is-expanded');
        });
        document.querySelectorAll('.dropdown-toggle').forEach(t => {
          t.setAttribute('aria-expanded', 'false');
        });

        // Toggle selected dropdown
        if (!isExpanded) {
          dropdown.classList.add('is-expanded');
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });

  // 4. Accordion / Collapse toggler
  const collapseToggles = document.querySelectorAll('[data-toggle="collapse"]');
  collapseToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = toggle.getAttribute('href') || toggle.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const isShown = targetElement.classList.contains('show');
        if (isShown) {
          targetElement.classList.remove('show');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          targetElement.classList.add('show');
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
  });
});
