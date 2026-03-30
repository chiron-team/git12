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

// Mock console methods for cleaner test output
global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};