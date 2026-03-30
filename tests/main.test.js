/**
 * Tests for main.js
 */

// Mock DOM elements
const mockDOM = () => {
    document.body.innerHTML = `
        <header class="header">
            <nav class="nav">
                <button class="nav__toggle"></button>
                <ul class="nav__menu">
                    <li><a href="#home" class="nav__link">Home</a></li>
                    <li><a href="#about" class="nav__link">About</a></li>
                </ul>
            </nav>
        </header>
        <main>
            <section id="home"></section>
            <section id="about"></section>
            <form id="contact-form">
                <input name="name" required>
                <input name="email" type="email" required>
                <textarea name="message" required></textarea>
                <button type="submit">Submit</button>
            </form>
            <button id="cta-button">CTA</button>
        </main>
    `;
};

describe('Git12App', () => {
    let Git12App;
    let app;

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
        
        // Mock the DOM
        mockDOM();
        
        // Import the module
        delete require.cache[require.resolve('../src/js/main.js')];
        Git12App = require('../src/js/main.js');
        
        // Create new app instance
        app = new Git12App();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should initialize without errors', () => {
        expect(app).toBeInstanceOf(Git12App);
        expect(console.log).toHaveBeenCalledWith('Git12 app initialized successfully!');
    });

    test('should validate form data correctly', () => {
        const validData = {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hello world!'
        };

        const invalidData = {
            name: '',
            email: 'invalid-email',
            message: ''
        };

        expect(app.validateForm(validData)).toBe(true);
        expect(app.validateForm(invalidData)).toBe(false);
    });

    test('should handle form submission', () => {
        const form = document.getElementById('contact-form');
        const event = new Event('submit');
        
        // Fill form with valid data
        form.elements.name.value = 'Test User';
        form.elements.email.value = 'test@example.com';
        form.elements.message.value = 'Test message';

        // Spy on preventDefault
        event.preventDefault = jest.fn();

        // Trigger form submission
        form.dispatchEvent(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });

    test('should throttle function calls', (done) => {
        const mockFn = jest.fn();
        const throttledFn = app.throttle(mockFn, 100);

        // Call function multiple times quickly
        throttledFn();
        throttledFn();
        throttledFn();

        // Should only be called once immediately
        expect(mockFn).toHaveBeenCalledTimes(1);

        // Wait for throttle period and check again
        setTimeout(() => {
            throttledFn();
            expect(mockFn).toHaveBeenCalledTimes(2);
            done();
        }, 150);
    });

    test('should debounce function calls', (done) => {
        const mockFn = jest.fn();
        const debouncedFn = app.debounce(mockFn, 100);

        // Call function multiple times quickly
        debouncedFn();
        debouncedFn();
        debouncedFn();

        // Should not be called immediately
        expect(mockFn).not.toHaveBeenCalled();

        // Wait for debounce period
        setTimeout(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
            done();
        }, 150);
    });
});