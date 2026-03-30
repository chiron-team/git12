/**
 * Git12 - Main JavaScript Module
 * Modern vanilla JavaScript with ES6+ features
 */

class Git12App {
    constructor() {
        this.counter = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupNavigation();
        this.setupFormHandling();
        this.setupScrollEffects();
        console.log('Git12 app initialized successfully!');
        this.renderCounter();
    }

    bindEvents() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMLoaded());
        } else {
            this.onDOMLoaded();
        }

        // Handle window events
        window.addEventListener('scroll', this.throttle(this.onScroll.bind(this), 16));
        window.addEventListener('resize', this.debounce(this.onResize.bind(this), 250));
    }

    onDOMLoaded() {
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        // Setup intersection observer for animations
        this.setupIntersectionObserver();
        this.setupCounter();
    }

    setupNavigation() {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = document.querySelectorAll('.nav__link');

        if (!navToggle || !navMenu) return;

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        const ctaButton = document.getElementById('cta-button');

        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            this.showNotification('Please fill in all fields correctly.', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent.', 'success');
        e.target.reset();
        
        // In a real application, you would send data to a server
        console.log('Form submitted:', data);
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return (
            data.name && data.name.trim().length > 0 &&
            data.email && emailRegex.test(data.email) &&
            data.message && data.message.trim().length > 0
        );
    }

    setupScrollEffects() {
        const header = document.querySelector('.header');
        
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        const animateElements = document.querySelectorAll('.card, .hero__title, .hero__subtitle');
        animateElements.forEach(el => observer.observe(el));
    }

    onScroll() {
        // Handle scroll events (already throttled)
        this.updateScrollProgress();
    }

    onResize() {
        // Handle resize events (already debounced)
        console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
    }

    updateScrollProgress() {
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff',
            color: 'white',
            borderRadius: '5px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// Initialize the application
const app = new Git12App();

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Git12App;
}