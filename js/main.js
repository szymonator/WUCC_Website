/**
 * Warwick University Climbing Club
 * Custom Main JS (Decoupled, Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. Preloader ===
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Fade out preloader on load
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        });
        
        // Fallback in case load event already fired
        if (document.readyState === 'complete') {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }
    }

    // === 2. Sticky Navbar ===
    const header = document.querySelector('.main-header-area');
    const checkScroll = () => {
        if (window.scrollY > 0) {
            header?.classList.add('sticky');
        } else {
            header?.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // === 3. Mobile Navigation Menu ===
    const toggler = document.querySelector('.classy-navbar-toggler');
    const menu = document.querySelector('.classy-menu');
    const closeBtn = document.querySelector('.classycloseIcon');

    if (toggler && menu) {
        toggler.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('menu-active');
            toggler.classList.toggle('active');
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('menu-active');
            toggler?.classList.remove('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menu && menu.classList.contains('menu-active')) {
            if (!menu.contains(e.target) && !toggler?.contains(e.target)) {
                menu.classList.remove('menu-active');
                toggler?.classList.remove('active');
            }
        }
    });

    // Mobile dropdowns
    const navItems = document.querySelectorAll('.classynav > ul > li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        if (link && dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    navItems.forEach(other => {
                        if (other !== item) {
                            other.querySelector('.dropdown')?.classList.remove('show');
                        }
                    });
                    
                    dropdown.classList.toggle('show');
                }
            });
        }
    });

    // === 4. Custom Hero Slider (Homepage welcome slides) ===
    const slider = document.querySelector('.welcome-slides');
    if (slider) {
        const slides = Array.from(slider.querySelectorAll('.single-welcome-slide'));
        if (slides.length > 1) {
            let currentSlide = 0;
            let slideInterval;

            // Make slides container relatively positioned and handle setup
            slider.style.position = 'relative';
            slider.style.height = '880px';
            slider.style.overflow = 'hidden';
            
            // Adjust slider container height responsively via JS fallback/load
            const adjustSliderHeight = () => {
                if (window.innerWidth <= 767) {
                    slider.style.height = '600px';
                } else if (window.innerWidth <= 1199) {
                    slider.style.height = '750px';
                } else {
                    slider.style.height = '880px';
                }
            };
            window.addEventListener('resize', adjustSliderHeight);
            adjustSliderHeight();

            // Create navigation arrows
            const prevBtn = document.createElement('button');
            prevBtn.className = 'slider-prev';
            prevBtn.innerHTML = '<i class="fa fa-angle-left"></i>';
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'slider-next';
            nextBtn.innerHTML = '<i class="fa fa-angle-right"></i>';

            slider.appendChild(prevBtn);
            slider.appendChild(nextBtn);

            const showSlide = (index) => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (index + slides.length) % slides.length;
                slides[currentSlide].classList.add('active');
            };

            const startSlideshow = () => {
                slideInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 10000);
            };

            const resetSlideshow = () => {
                clearInterval(slideInterval);
                startSlideshow();
            };

            // Set first slide active
            slides[currentSlide].classList.add('active');
            startSlideshow();

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentSlide - 1);
                resetSlideshow();
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentSlide + 1);
                resetSlideshow();
            });
        } else if (slides.length === 1) {
            slides[0].classList.add('active');
        }
    }

    // === 5. Accordion/Collapse Toggle ===
    const collapsibles = document.querySelectorAll('.a-collapsible');
    collapsibles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                target.classList.remove('show');
            } else {
                target.classList.add('show');
            }
        });
    });

    // === 6. Lightweight Gallery Lightbox ===
    const imageLinks = Array.from(document.querySelectorAll('.portfolio-img'));
    if (imageLinks.length > 0) {
        let currentIndex = 0;

        // Create lightbox DOM elements
        const lightbox = document.createElement('div');
        lightbox.id = 'custom-lightbox';
        lightbox.className = 'custom-lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-container">
                <img class="lightbox-content" src="" alt="Gallery Image">
            </div>
            <a class="lightbox-prev">&#10094;</a>
            <a class="lightbox-next">&#10095;</a>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-content');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        const showImage = (index) => {
            currentIndex = index;
            const imgUrl = imageLinks[currentIndex].getAttribute('href');
            lightboxImg.src = imgUrl;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden'; // Lock background scrolling
        };

        imageLinks.forEach((imgLink, index) => {
            imgLink.addEventListener('click', (e) => {
                e.preventDefault();
                showImage(index);
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
            lightboxImg.src = '';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });

        const showNext = (e) => {
            e.stopPropagation();
            showImage((currentIndex + 1) % imageLinks.length);
        };

        const showPrev = (e) => {
            e.stopPropagation();
            showImage((currentIndex - 1 + imageLinks.length) % imageLinks.length);
        };

        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Keyboard navigation keys
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showImage((currentIndex + 1) % imageLinks.length);
            if (e.key === 'ArrowLeft') showImage((currentIndex - 1 + imageLinks.length) % imageLinks.length);
        });
    }
});
