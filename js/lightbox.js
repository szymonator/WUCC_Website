document.addEventListener('DOMContentLoaded', () => {
  // Inject style block for lightbox and slider transitions to bypass caching
  const style = document.createElement('style');
  style.textContent = `
    .lightbox-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.4s ease, visibility 0.4s;
    }
    .lightbox-overlay.is-active {
      opacity: 1;
      visibility: visible;
    }
    .lightbox-content {
      position: relative;
      width: 100%;
      height: 85%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .lightbox-slide {
      position: absolute;
      max-width: 90%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 4px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.35s ease;
      opacity: 1;
      transform: translateX(0) scale(1);
      backface-visibility: hidden;
    }
    .slide-out-left {
      transform: translateX(-100%) scale(0.9);
      opacity: 0;
    }
    .slide-out-right {
      transform: translateX(100%) scale(0.9);
      opacity: 0;
    }
    .slide-in-left {
      transform: translateX(-100%) scale(0.9);
      opacity: 0;
    }
    .slide-in-right {
      transform: translateX(100%) scale(0.9);
      opacity: 0;
    }
    .lightbox-close {
      position: absolute;
      top: 20px;
      right: 30px;
      background: none !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 45px !important;
      font-weight: 300 !important;
      cursor: pointer !important;
      transition: color 0.2s ease !important;
      z-index: 10020 !important;
      outline: none !important;
    }
    .lightbox-close:hover {
      color: var(--color-accent) !important;
    }
    .lightbox-prev,
    .lightbox-next {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      background-color: rgba(0, 0, 0, 0.4) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      color: #ffffff !important;
      width: 50px !important;
      height: 50px !important;
      border-radius: 50% !important;
      font-size: 24px !important;
      display: none;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      z-index: 10010 !important;
      transition: background-color 0.2s, border-color 0.2s, color 0.2s !important;
      outline: none !important;
      padding: 0 !important;
      box-sizing: border-box !important;
    }
    .lightbox-prev {
      left: 30px !important;
    }
    .lightbox-next {
      right: 30px !important;
    }
    .lightbox-prev:hover,
    .lightbox-next:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
      color: var(--color-accent) !important;
    }
    @media (max-width: 767px) {
      .lightbox-prev {
        left: 10px !important;
      }
      .lightbox-next {
        right: 10px !important;
      }
      .lightbox-prev,
      .lightbox-next {
        width: 40px !important;
        height: 40px !important;
        font-size: 20px !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Create lightbox overlay and append to body
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.setAttribute('aria-hidden', 'true');
  
  lightboxOverlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&lt;</button>
    <button class="lightbox-next" aria-label="Next image">&gt;</button>
    <div class="lightbox-content"></div>
  `;
  
  document.body.appendChild(lightboxOverlay);

  const lightboxContent = lightboxOverlay.querySelector('.lightbox-content');
  const closeButton = lightboxOverlay.querySelector('.lightbox-close');
  const prevButton = lightboxOverlay.querySelector('.lightbox-prev');
  const nextButton = lightboxOverlay.querySelector('.lightbox-next');

  // Gallery state tracking
  let isGalleryActive = false;
  let activeGallery = [];
  let currentGalleryIndex = 0;
  let isTransitioning = false;

  const openLightbox = (imgSrc, isGallery = false) => {
    // Clear and add initial slide
    lightboxContent.innerHTML = '';
    const initialSlide = document.createElement('img');
    initialSlide.className = 'lightbox-slide';
    initialSlide.src = imgSrc;
    initialSlide.alt = 'Gallery Image Expanded';
    lightboxContent.appendChild(initialSlide);

    lightboxOverlay.classList.add('is-active');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    
    // Only show control buttons for multi-image galleries
    if (isGallery && activeGallery.length > 1) {
      prevButton.style.display = 'flex';
      nextButton.style.display = 'flex';
    } else {
      prevButton.style.display = 'none';
      nextButton.style.display = 'none';
    }
  };

  const closeLightbox = () => {
    lightboxOverlay.classList.remove('is-active');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      lightboxContent.innerHTML = '';
    }, 400);
    
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    isGalleryActive = false;
    activeGallery = [];
    currentGalleryIndex = 0;
    isTransitioning = false;
  };

  const transitionSlide = (newSrc, direction) => {
    if (isTransitioning) return;
    const currentSlide = lightboxContent.querySelector('.lightbox-slide');
    if (!currentSlide) return;

    isTransitioning = true;

    // Create the new slide
    const newSlide = document.createElement('img');
    newSlide.className = 'lightbox-slide';
    newSlide.src = newSrc;
    newSlide.alt = 'Gallery Image Expanded';

    // Position new slide and transition
    if (direction === 'next') {
      newSlide.classList.add('slide-in-right');
      lightboxContent.appendChild(newSlide);
      
      newSlide.offsetWidth; // Force reflow

      currentSlide.classList.add('slide-out-left');
      newSlide.classList.remove('slide-in-right');
    } else {
      newSlide.classList.add('slide-in-left');
      lightboxContent.appendChild(newSlide);
      
      newSlide.offsetWidth; // Force reflow

      currentSlide.classList.add('slide-out-right');
      newSlide.classList.remove('slide-in-left');
    }

    const onTransitionEnd = (e) => {
      if (e.target === currentSlide) {
        currentSlide.remove();
        isTransitioning = false;
        currentSlide.removeEventListener('transitionend', onTransitionEnd);
      }
    };
    currentSlide.addEventListener('transitionend', onTransitionEnd);
  };

  const showNextImage = () => {
    if (!isGalleryActive || activeGallery.length <= 1 || isTransitioning) return;
    const nextIdx = (currentGalleryIndex + 1) % activeGallery.length;
    currentGalleryIndex = nextIdx;
    transitionSlide(activeGallery[currentGalleryIndex], 'next');
  };

  const showPrevImage = () => {
    if (!isGalleryActive || activeGallery.length <= 1 || isTransitioning) return;
    const prevIdx = (currentGalleryIndex - 1 + activeGallery.length) % activeGallery.length;
    currentGalleryIndex = prevIdx;
    transitionSlide(activeGallery[currentGalleryIndex], 'prev');
  };

  // Button Click Listeners
  prevButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
  });

  nextButton.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
  });

  // 1. Attach listeners to links explicitly designated as lightbox triggers
  const zoomLinks = document.querySelectorAll('.gallery-zoom-btn, .portfolio-img, .exec-image-link');
  
  // Find all elements that form part of a gallery on the page
  const galleryTriggers = Array.from(document.querySelectorAll('.gallery-zoom-btn, .portfolio-img'));
  const galleryHrefs = galleryTriggers.map(trigger => trigger.getAttribute('href') || '');

  zoomLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isGalleryItem = link.classList.contains('gallery-zoom-btn') || link.classList.contains('portfolio-img');
      if (isGalleryItem && galleryHrefs.length > 1) {
        isGalleryActive = true;
        activeGallery = galleryHrefs;
        currentGalleryIndex = galleryHrefs.indexOf(href);
        openLightbox(href, true);
      } else {
        isGalleryActive = false;
        activeGallery = [];
        currentGalleryIndex = 0;
        openLightbox(href, false);
      }
    });
    link.style.cursor = 'pointer';
  });

  // 2. Find and make static content images clickable if they are not links
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    // Skip header, footer, navigation, adventure cards, hero images, and the lightbox image itself
    if (img.closest('header') || img.closest('footer') || img.closest('.site-footer') || img.closest('.circle-logo-container') || img.closest('.nav-brand') || img.closest('.footer-section') || img.closest('.adventure-card') || img.classList.contains('hero-slide-img') || img.classList.contains('lightbox-image') || img.closest('.lightbox-overlay')) {
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
      isGalleryActive = false;
      activeGallery = [];
      currentGalleryIndex = 0;
      openLightbox(src, false);
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
    if (!lightboxOverlay.classList.contains('is-active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      showNextImage();
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
      showPrevImage();
    }
  });

  // Mobile Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxOverlay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxOverlay.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }, { passive: true });

  const handleSwipeGesture = () => {
    if (isTransitioning) return;
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50; // pixels
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe Right -> Show previous image
        showPrevImage();
      } else {
        // Swipe Left -> Show next image
        showNextImage();
      }
    }
  };
});
