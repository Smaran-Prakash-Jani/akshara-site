document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursor-trail');
    
    // Only active on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Trail follows with slight delay
            setTimeout(() => {
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
            }, 50);
        });

        // Add hover classes for interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .music-card, .highlight-hover, .gallery-item');
        
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                trail.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                trail.classList.remove('active');
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-up, .fade-up-delay, .fade-up-delay-2, .fade-up-delay-3');
    revealElements.forEach(el => observer.observe(el));


    // --- Parallax Effect for Background & Elements ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Blobs move slower
        const blobs = document.querySelector('.background-blobs');
        if (blobs) {
            blobs.style.transform = `translateY(${scrolled * 0.2}px)`;
        }

        // Hero image anti-gravity drift adjusted by scroll
        const heroImg = document.querySelector('.hero-image-container');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
    });
});
