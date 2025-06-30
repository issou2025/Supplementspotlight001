// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("Supplement Spotlight JS Loaded");
    // Future sitewide scripts can go here.
    // E.g., mobile menu toggle, sticky header effects, etc.

    // Mobile Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (navToggle && mainNav) {
        // Toggle navigation
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                mainNav.classList.contains('active'));
        });

        // Close navigation when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close navigation when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }

    // Sticky header
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }

            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scrolling down
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scrolling up
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }

            lastScroll = currentScroll;
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDarkMode = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            darkModeToggle.setAttribute('aria-label', 
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true' || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches && 
             !localStorage.getItem('darkMode'))) {
            document.documentElement.classList.add('dark-mode');
        }
    }

    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('[type="submit"]');
            const originalText = submitButton.textContent;
            
            try {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Add your form submission logic here
                
                submitButton.textContent = 'Sent!';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            } catch (error) {
                console.error('Form submission error:', error);
                submitButton.textContent = 'Error!';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    });
});