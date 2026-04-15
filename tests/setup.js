/**
 * Test setup file
 * This file is loaded before all tests
 */

// Mock functions for browser APIs that might not be available in test environment
global.scrollTo = jest.fn();
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
};

// Mock Counter class (loaded as a separate script in browser)
global.Counter = class Counter {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }
    increment() {
        this.value++;
    }
    decrement() {
        this.value--;
    }
    render() {}
};

// Mock SharedComponents (loaded as a separate script in browser)
global.SharedComponents = {
    updateCartBadge: jest.fn(),
    getCartCount: jest.fn(() => 0)
};

// Mock console methods for cleaner test output
global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};