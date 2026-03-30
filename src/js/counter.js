class Counter {
    constructor(initialValue = 0) {
        this.value = initialValue;
        this.render();
    }

    increment() {
        this.value++;
        this.render();
    }

    decrement() {
        this.value--;
        this.render();
    }

    render() {
        // Update the counter display
        const counterDisplay = document.getElementById('counter-display');
        if (counterDisplay) {
            counterDisplay.textContent = this.value;
        }
    }
}

export default Counter;