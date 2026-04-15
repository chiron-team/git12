/**
 * Tests for components.js (Shared Navbar & Footer)
 */

describe('SharedComponents', () => {
    let SharedComponents;

    const setupDOM = () => {
        document.body.innerHTML = `
            <header class="header"></header>
            <main class="main">
                <section id="home"></section>
            </main>
            <footer class="footer"></footer>
        `;
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        setupDOM();

        // Clear module cache and re-import
        delete require.cache[require.resolve('../src/js/components.js')];
        SharedComponents = require('../src/js/components.js');

        // Explicitly inject in case auto-init didn't trigger
        SharedComponents.inject();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        localStorage.clear();
    });

    test('should render the navbar with all navigation links', () => {
        const navLinks = document.querySelectorAll('.nav__link');
        const linkTexts = Array.from(navLinks).map((link) => link.textContent.trim());

        expect(linkTexts).toContain('Home');
        expect(linkTexts).toContain('Catálogo');
        expect(linkTexts).toContain('Contacto');
        expect(linkTexts).toContain('Acerca de');
        expect(navLinks.length).toBe(4);
    });

    test('should render the brand name in navbar', () => {
        const brand = document.querySelector('.nav__brand h1');
        expect(brand).not.toBeNull();
        expect(brand.textContent).toBe('Git12');
    });

    test('should render cart icon with badge', () => {
        const cartIcon = document.querySelector('.nav__cart');
        expect(cartIcon).not.toBeNull();

        const badge = document.querySelector('.nav__cart-badge');
        expect(badge).not.toBeNull();
        expect(badge.textContent).toBe('0');
    });

    test('should show cart count from localStorage', () => {
        // Set cart data before rendering
        localStorage.setItem('cart', JSON.stringify([
            { id: 1, quantity: 2 },
            { id: 2, quantity: 3 }
        ]));

        // Re-render components with cart data
        setupDOM();
        SharedComponents.inject();

        const badge = document.querySelector('.nav__cart-badge');
        expect(badge).not.toBeNull();
        expect(badge.textContent).toBe('5');
        expect(badge.classList.contains('nav__cart-badge--empty')).toBe(false);
    });

    test('should render the footer with brand info', () => {
        const footerTitle = document.querySelector('.footer__title');
        expect(footerTitle).not.toBeNull();
        expect(footerTitle.textContent).toBe('Git12');
    });

    test('should render footer links section', () => {
        const footerLinks = document.querySelectorAll('.footer__link');
        const linkTexts = Array.from(footerLinks).map((link) => link.textContent.trim());

        expect(linkTexts).toContain('Home');
        expect(linkTexts).toContain('Catálogo');
        expect(linkTexts).toContain('Contacto');
        expect(linkTexts).toContain('Acerca de');
    });

    test('should render footer contact info', () => {
        const contactInfo = document.querySelectorAll('.footer__info');
        expect(contactInfo.length).toBeGreaterThanOrEqual(3);
    });

    test('should render footer social links', () => {
        const socialLinks = document.querySelectorAll('.footer__social-link');
        expect(socialLinks.length).toBeGreaterThanOrEqual(3);
    });

    test('should render footer copyright', () => {
        const bottomText = document.querySelector('.footer__bottom p');
        expect(bottomText).not.toBeNull();
        const currentYear = new Date().getFullYear();
        expect(bottomText.textContent).toContain(String(currentYear));
        expect(bottomText.textContent).toContain('Git12');
    });

    test('should highlight active page link', () => {
        // Default jsdom location maps to index.html (Home)
        const activeLink = document.querySelector('.nav__link--active');
        expect(activeLink).not.toBeNull();
        expect(activeLink.textContent.trim()).toBe('Home');
    });

    test('should render mobile toggle button', () => {
        const toggle = document.getElementById('nav-toggle');
        expect(toggle).not.toBeNull();

        const lines = toggle.querySelectorAll('.nav__toggle-line');
        expect(lines.length).toBe(3);
    });

    test('should toggle mobile menu on button click', () => {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('nav-menu');

        toggle.click();
        expect(menu.classList.contains('active')).toBe(true);
        expect(toggle.classList.contains('active')).toBe(true);

        toggle.click();
        expect(menu.classList.contains('active')).toBe(false);
        expect(toggle.classList.contains('active')).toBe(false);
    });

    test('updateCartBadge should update the badge count', () => {
        localStorage.setItem('cart', JSON.stringify([
            { id: 1, quantity: 4 }
        ]));

        SharedComponents.updateCartBadge();

        const badge = document.querySelector('.nav__cart-badge');
        expect(badge.textContent).toBe('4');
        expect(badge.classList.contains('nav__cart-badge--empty')).toBe(false);
    });

    test('updateCartBadge should show empty state when cart is empty', () => {
        localStorage.setItem('cart', JSON.stringify([]));

        SharedComponents.updateCartBadge();

        const badge = document.querySelector('.nav__cart-badge');
        expect(badge.textContent).toBe('0');
        expect(badge.classList.contains('nav__cart-badge--empty')).toBe(true);
    });

    test('should render footer description', () => {
        const description = document.querySelector('.footer__description');
        expect(description).not.toBeNull();
        expect(description.textContent.length).toBeGreaterThan(0);
    });

    test('should inject into DOM without existing header/footer', () => {
        // Setup DOM without header/footer
        document.body.innerHTML = '<main class="main"><section id="home"></section></main>';
        SharedComponents.inject();

        const header = document.querySelector('header.header');
        const footer = document.querySelector('footer.footer');
        expect(header).not.toBeNull();
        expect(footer).not.toBeNull();
    });
});
