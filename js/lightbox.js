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

  // Find all images on the page and make them clickable if they are content images
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    // Skip header, footer, navigation images
    if (img.closest('header') || img.closest('footer') || img.closest('.site-footer') || img.closest('.circle-logo-container') || img.closest('.nav-brand') || img.closest('.footer-section')) {
      return;
    }
    
    // Skip logos/icons/crests by checking src or classes
    const src = img.getAttribute('src') || '';
    if (src.includes('/core-img/') || img.classList.contains('logo') || img.classList.contains('icon') || img.classList.contains('social-icon')) {
      return;
    }
    
    // Check if the image is inside an <a> tag
    const parentLink = img.closest('a');
    if (parentLink) {
      const href = parentLink.getAttribute('href') || '';
      // If the link points to an image, intercept click and open lightbox
      const isImgHref = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(href);
      if (isImgHref || parentLink.classList.contains('portfolio-img') || parentLink.classList.contains('gallery-zoom-btn') || parentLink.classList.contains('exec-image-link')) {
        parentLink.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(href || src);
        });
        parentLink.style.cursor = 'pointer';
      }
      // If the link points to a page (e.g. another page like a trip subpage), do nothing and let it navigate normally!
    } else {
      // It's a static content image not wrapped in a link. Make it clickable!
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        openLightbox(src);
      });
    }
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
