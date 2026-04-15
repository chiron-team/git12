/**
 * Git12 - Shared Components (Navbar & Footer)
 * Reusable navigation and footer rendered via vanilla JS
 */

const SharedComponents = (() => {
    // Navigation links configuration
    const NAV_LINKS = [
        { label: 'Home', href: '/index.html' },
        { label: 'Catálogo', href: '/catalogo.html' },
        { label: 'Contacto', href: '/contacto.html' },
        { label: 'Acerca de', href: '/acerca.html' }
    ];

    // Cart state from localStorage
    function getCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            return cart.reduce((total, item) => total + (item.quantity || 1), 0);
        } catch (e) {
            return 0;
        }
    }

    // Determine the active page based on the current URL
    function getActivePath() {
        const path = window.location.pathname;
        // Normalize: treat "/" and "/index.html" as the same
        if (path === '/' || path.endsWith('/index.html') || path === '') {
            return '/index.html';
        }
        // Match by filename
        for (const link of NAV_LINKS) {
            if (path.endsWith(link.href.replace('/', ''))) {
                return link.href;
            }
        }
        return '/index.html';
    }

    // Resolve href relative to root (works with file:// and http://)
    function resolveHref(href) {
        const path = window.location.pathname;
        const base = path.substring(0, path.lastIndexOf('/') + 1);
        // Strip leading slash to get filename
        const filename = href.replace(/^\//, '');
        return base + filename;
    }

    // Build the navbar inner HTML
    function renderNavbarContent() {
        const activePath = getActivePath();
        const cartCount = getCartCount();

        const navLinksHTML = NAV_LINKS.map((link) => {
            const isActive = activePath === link.href;
            const activeClass = isActive ? ' nav__link--active' : '';
            return `
                <li class="nav__item">
                    <a href="${resolveHref(link.href)}" class="nav__link${activeClass}">${link.label}</a>
                </li>`;
        }).join('');

        const cartBadge = cartCount > 0
            ? `<span class="nav__cart-badge">${cartCount}</span>`
            : '<span class="nav__cart-badge nav__cart-badge--empty">0</span>';

        return `
            <nav class="nav">
                <div class="nav__brand">
                    <a href="${resolveHref('/index.html')}" class="nav__brand-link">
                        <h1>Git12</h1>
                    </a>
                </div>
                <ul class="nav__menu" id="nav-menu">
                    ${navLinksHTML}
                </ul>
                <div class="nav__actions">
                    <a href="${resolveHref('/catalogo.html')}" class="nav__cart" aria-label="Carrito de compras">
                        <svg class="nav__cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        ${cartBadge}
                    </a>
                    <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation">
                        <span class="nav__toggle-line"></span>
                        <span class="nav__toggle-line"></span>
                        <span class="nav__toggle-line"></span>
                    </button>
                </div>
            </nav>`;
    }

    // Build the footer inner HTML
    function renderFooterContent() {
        const currentYear = new Date().getFullYear();

        return `
            <div class="container">
                <div class="footer__grid">
                    <div class="footer__section footer__brand-section">
                        <h3 class="footer__title">Git12</h3>
                        <p class="footer__description">Tu tienda online de confianza. Productos de calidad con la mejor atención al cliente.</p>
                    </div>
                    <div class="footer__section">
                        <h4 class="footer__subtitle">Enlaces</h4>
                        <ul class="footer__links">
                            <li><a href="${resolveHref('/index.html')}" class="footer__link">Home</a></li>
                            <li><a href="${resolveHref('/catalogo.html')}" class="footer__link">Catálogo</a></li>
                            <li><a href="${resolveHref('/contacto.html')}" class="footer__link">Contacto</a></li>
                            <li><a href="${resolveHref('/acerca.html')}" class="footer__link">Acerca de</a></li>
                        </ul>
                    </div>
                    <div class="footer__section">
                        <h4 class="footer__subtitle">Contacto</h4>
                        <ul class="footer__links">
                            <li class="footer__info">📧 info@git12store.com</li>
                            <li class="footer__info">📞 +1 (555) 123-4567</li>
                            <li class="footer__info">📍 Calle Principal 123, Ciudad</li>
                        </ul>
                    </div>
                    <div class="footer__section">
                        <h4 class="footer__subtitle">Síguenos</h4>
                        <div class="footer__social">
                            <a href="#" class="footer__social-link" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="#" class="footer__social-link" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="#" class="footer__social-link" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer__bottom">
                    <p>&copy; ${currentYear} Git12. Todos los derechos reservados.</p>
                </div>
            </div>`;
    }

    // Inject navbar and footer, and bind toggle events
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', inject);
        } else {
            inject();
        }
    }

    function inject() {
        // Inject navbar into existing header or create one
        let header = document.querySelector('header.header');
        if (header) {
            header.id = 'shared-header';
            header.innerHTML = renderNavbarContent();
        } else {
            const main = document.querySelector('main');
            header = document.createElement('header');
            header.className = 'header';
            header.id = 'shared-header';
            header.innerHTML = renderNavbarContent();
            if (main) {
                main.parentNode.insertBefore(header, main);
            } else {
                document.body.insertBefore(header, document.body.firstChild);
            }
        }

        // Inject footer into existing footer or create one
        let footer = document.querySelector('footer.footer');
        if (footer) {
            footer.id = 'shared-footer';
            footer.innerHTML = renderFooterContent();
        } else {
            footer = document.createElement('footer');
            footer.className = 'footer';
            footer.id = 'shared-footer';
            footer.innerHTML = renderFooterContent();
            document.body.appendChild(footer);
        }

        // Bind mobile toggle
        bindNavToggle();
    }

    function bindNavToggle() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!navToggle || !navMenu) {
            return;
        }

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click (mobile)
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Public API to update cart badge (can be called from other scripts)
    function updateCartBadge() {
        const badge = document.querySelector('.nav__cart-badge');
        if (badge) {
            const count = getCartCount();
            badge.textContent = count;
            if (count > 0) {
                badge.classList.remove('nav__cart-badge--empty');
            } else {
                badge.classList.add('nav__cart-badge--empty');
            }
        }
    }

    // Initialize
    init();

    return {
        updateCartBadge,
        getCartCount,
        inject
    };
})();

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SharedComponents;
}
