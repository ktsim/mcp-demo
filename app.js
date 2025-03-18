// Hello World Feature
window.onload = function() {
    document.getElementById('greeting').textContent = 'Hello, World!';
};

function changeGreeting() {
    const greetings = [
        'Hello, World!',
        'Bonjour, le monde!',
        'Hola, Mundo!',
        '你好，世界！',
        'こんにちは、世界！'
    ];
    
    const currentGreeting = document.getElementById('greeting').textContent;
    const currentIndex = greetings.indexOf(currentGreeting);
    const nextIndex = (currentIndex + 1) % greetings.length;
    
    document.getElementById('greeting').textContent = greetings[nextIndex];
}

// Calculator Feature
let displayValue = '';

function appendToDisplay(value) {
    // Prevent multiple decimal points
    if (value === '.' && displayValue.includes('.')) return;
    
    // Prevent multiple operators in sequence
    if ('+-*/'.includes(value)) {
        const lastChar = displayValue[displayValue.length - 1];
        if ('+-*/'.includes(lastChar)) {
            displayValue = displayValue.slice(0, -1);
        }
    }
    
    displayValue += value;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function calculate() {
    try {
        // Safely evaluate the expression
        const result = Function('return ' + displayValue)();
        displayValue = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}
