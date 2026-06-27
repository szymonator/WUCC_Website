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

  // Sticky Header scroll handling
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 0) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  // Set active nav item based on current URL path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-header .nav-link, .site-header .dropdown-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const isMatch = (href === '/' && currentPath === '/') || 
                      (href !== '/' && currentPath.startsWith(href));
      if (isMatch) {
        link.classList.add('active');
        if (link.classList.contains('dropdown-item')) {
          const parentDropdown = link.closest('.dropdown');
          if (parentDropdown) {
            parentDropdown.querySelector('.nav-link')?.classList.add('active');
          }
        }
      }
    }
  });

  // Prevent dropdown toggle click action on desktop (min-width: 992px)
  // to avoid click toggles while allowing hover navigation.
  const dropdownToggles = document.querySelectorAll('.site-header .dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth >= 992) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
});
