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
let memoryValue = 0;

function updateMemoryDisplay() {
    document.getElementById('memory-indicator').textContent = `M: ${memoryValue}`;
}

function appendToDisplay(value) {
    if (displayValue === 'Error') {
        clearDisplay();
    }
    
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
        if (!displayValue) return;
        
        // Safely evaluate the expression
        const result = Function('return ' + displayValue)();
        displayValue = Number.isInteger(result) ? result.toString() : 
                      Number.isFinite(result) ? result.toFixed(8).replace(/\.?0+$/, '') : 
                      'Error';
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1000);
    }
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function square() {
    try {
        if (!displayValue) return;
        calculate(); // First calculate any pending operations
        const num = parseFloat(displayValue);
        displayValue = (num * num).toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function squareRoot() {
    try {
        if (!displayValue) return;
        calculate(); // First calculate any pending operations
        const num = parseFloat(displayValue);
        if (num < 0) {
            displayValue = 'Error';
        } else {
            displayValue = Math.sqrt(num).toString();
        }
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function percentage() {
    try {
        if (!displayValue) return;
        calculate(); // First calculate any pending operations
        const num = parseFloat(displayValue);
        displayValue = (num / 100).toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function toggleSign() {
    try {
        if (!displayValue) return;
        calculate(); // First calculate any pending operations
        const num = parseFloat(displayValue);
        displayValue = (-num).toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function memoryOperation(operation) {
    try {
        switch (operation) {
            case 'mc': // Memory Clear
                memoryValue = 0;
                break;
            case 'mr': // Memory Recall
                displayValue = memoryValue.toString();
                break;
            case 'mPlus': // Memory Add
                calculate();
                memoryValue += parseFloat(displayValue) || 0;
                break;
            case 'mMinus': // Memory Subtract
                calculate();
                memoryValue -= parseFloat(displayValue) || 0;
                break;
        }
        updateMemoryDisplay();
        if (operation === 'mr') {
            updateDisplay();
        }
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}
