document.addEventListener('DOMContentLoaded', () => {
  // Create lightbox overlay and append to body
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.setAttribute('aria-hidden', 'true');
  
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <div class="lightbox-content">
      <img class="lightbox-image" alt="Gallery Image Expanded">
    </div>
  `;
  
  document.body.appendChild(lightboxOverlay);

  const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
  const closeButton = lightboxOverlay.querySelector('.lightbox-close');

  const openLightbox = (imgSrc) => {
    lightboxImage.src = imgSrc;
    lightboxOverlay.classList.add('is-active');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const closeLightbox = () => {
    lightboxOverlay.classList.remove('is-active');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  };

  // 1. Attach listeners to links explicitly designated as lightbox triggers
  const zoomLinks = document.querySelectorAll('.gallery-zoom-btn, .portfolio-img, .exec-image-link');
  zoomLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(href);
    });
    link.style.cursor = 'pointer';
  });

  // 2. Find and make static content images clickable if they are not links
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    // Skip header, footer, navigation, adventure cards, and hero images
    if (img.closest('header') || img.closest('footer') || img.closest('.site-footer') || img.closest('.circle-logo-container') || img.closest('.nav-brand') || img.closest('.footer-section') || img.closest('.adventure-card') || img.classList.contains('hero-slide-img')) {
      return;
    }
    
    // Skip logos/icons/crests by checking src or classes
    const src = img.getAttribute('src') || '';
    if (src.includes('/core-img/') || img.classList.contains('logo') || img.classList.contains('icon') || img.classList.contains('social-icon')) {
      return;
    }
    
    // Skip if the image is already inside any link
    if (img.closest('a')) {
      return;
    }
    
    // Static content image! Make it clickable to open itself in lightbox
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openLightbox(src);
    });
  });

  // Close listeners
  closeButton.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxOverlay.classList.contains('is-active')) {
      closeLightbox();
    }
  });
});
