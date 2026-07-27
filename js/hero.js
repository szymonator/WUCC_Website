document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const btnPrev = document.querySelector('.hero-btn-prev');
  const btnNext = document.querySelector('.hero-btn-next');
  
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds per slide

  const showSlide = (index) => {
    // Bounds check
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    currentSlide = index;

    // Reset all slides and dots
    slides.forEach(slide => slide.classList.remove('is-active'));
    dots.forEach(dot => dot.classList.remove('is-active'));

    // Activate the current slide and corresponding dot
    slides[currentSlide].classList.add('is-active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('is-active');
    }
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  // Auto-rotation controls
  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, slideDuration);
  };

  const stopAutoSlide = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  };

  // Event Listeners for manual navigation buttons
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      nextSlide();
      startAutoSlide(); // Reset timer
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      prevSlide();
      startAutoSlide(); // Reset timer
    });
  }

  // Event Listeners for indicator dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoSlide(); // Reset timer
    });
  });

  // Pause slideshow on hover
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoSlide);
    heroSection.addEventListener('mouseleave', startAutoSlide);
  }

  // Pause slideshow when tab is not visible (saves CPU/battery)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // Initialize first slide and start auto-sliding
  showSlide(0);
  startAutoSlide();
});
