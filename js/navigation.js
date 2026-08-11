document.addEventListener('DOMContentLoaded', () => {

  console.log(`
                                                                                    
               ▓▓▓▓                                                             
              ▓░░░░▓                                                            
             ▓░░░░░░▓                                                           
           ▓▓░░░░░░▓                                                            
    ▓▓▓▓▓▓▓░░░░░░▓▓                                                             
   ▓░░░░░░░░░░░░▓                                                               
   ▓░░░░░░░░░▓░░▓                                                               
   █▓░░░░░░░▓░░░▓                                                               
    █▓▓░░░░░▓░░░▓                                                               
     ██▓░░░▓░░░░▓                                                               
       █▓▓░░░░░░░▓▓                                                             
        █▓░░░░░░░░░▓▓                                                           
         ▓▓░░░░░░░░░▒▓                                                          
         █▓░░░░░▓▓▓▒▒▓▓                                                         
        █▓▓░░▒▓▓▓  ▓▓▓                                                          
        █▓▒▒▓▓                                                                  
       █▓▒▓▓                                                                    
       █▓▓                                                                      
                                                                                
  ██   █  █  █ █  ███ ███ ███                                                   
  ███  █  █  █ █  █   █   █                                                     
  █ ██ █  █  █ █  ███ █   █                                                     
  █  ███  █  █ █    █ █   █                                                     
  █   ██   ██  ██ ███ ███ ███  
  
  The best climbing competition in the world!
  - Tara F.
`);

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

  // Handle WhatsApp Group link dynamic notification
  const showToast = (message) => {
    let container = document.getElementById('wucc-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'wucc-toast-container';
      container.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      if (window.innerWidth < 768) {
        container.style.right = '20px';
        container.style.left = '20px';
        container.style.bottom = '20px';
        container.style.alignItems = 'center';
      }
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background-color: #0d0d0d;
      color: #ffffff;
      border: 1px solid var(--color-accent, #FF5A4B);
      border-radius: 8px;
      padding: 16px 24px;
      font-size: 15px;
      font-weight: 500;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: auto;
      max-width: 340px;
      line-height: 1.4;
      text-align: center;
    `;
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  };

  const whatsappLinks = document.querySelectorAll('.whatsapp-link');
  whatsappLinks.forEach(link => {
    link.removeAttribute('href');
    link.removeAttribute('target');
    link.style.cursor = 'pointer';

    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Our 2026/27 groupchat hasn't been created yet, check again soon!");
    });
  });
});
