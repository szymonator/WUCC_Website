document.addEventListener('DOMContentLoaded', () => {
  const zoomButtons = document.querySelectorAll('.gallery-zoom-btn, .portfolio-img');
  
  if (zoomButtons.length === 0) return;

  // Create lightbox markup and append to body
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

  // Add click listeners to all gallery buttons
  zoomButtons.forEach(btn => {
    // If it's a link, target the href; if it's not, check parent
    const targetLink = btn.closest('a');
    if (targetLink) {
      targetLink.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(targetLink.getAttribute('href'));
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
