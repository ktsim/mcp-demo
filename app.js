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
let angleMode = 'DEG'; // 'DEG' or 'RAD'
let currentBase = 'dec'; // 'hex', 'dec', 'oct', 'bin'

// Constants
const CONSTANTS = {
    'pi': Math.PI,
    'e': Math.E
};

function updateMemoryDisplay() {
    document.getElementById('memory-indicator').textContent = `M: ${memoryValue}`;
}

function updateBaseDisplays(value) {
    try {
        const num = parseFloat(value);
        if (!isNaN(num) && isFinite(num) && Number.isInteger(num)) {
            document.getElementById('hex').textContent = `HEX: ${num.toString(16).toUpperCase()}`;
            document.getElementById('dec').textContent = `DEC: ${num.toString(10)}`;
            document.getElementById('oct').textContent = `OCT: ${num.toString(8)}`;
            document.getElementById('bin').textContent = `BIN: ${num.toString(2)}`;
        }
    } catch (error) {
        // Ignore conversion errors
    }
}

function toggleAngleMode() {
    angleMode = angleMode === 'DEG' ? 'RAD' : 'DEG';
    document.getElementById('angle-mode').textContent = angleMode;
    document.getElementById('angle-mode-btn').textContent = angleMode;
}

function toggleScientificMode() {
    const basicButtons = document.getElementById('basic-buttons');
    const scientificButtons = document.getElementById('scientific-buttons');
    const modeBtn = document.getElementById('scientific-mode-btn');
    
    if (basicButtons.style.display === 'none') {
        basicButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
        modeBtn.textContent = 'Basic';
    } else {
        basicButtons.style.display = 'none';
        scientificButtons.style.display = 'grid';
        modeBtn.textContent = 'Scientific';
    }
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
    if (displayValue && !isNaN(displayValue)) {
        updateBaseDisplays(displayValue);
    }
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

function toRadians(value) {
    return angleMode === 'DEG' ? value * Math.PI / 180 : value;
}

function toDegrees(value) {
    return angleMode === 'DEG' ? value * 180 / Math.PI : value;
}

function scientificFunction(func) {
    try {
        if (!displayValue) return;
        calculate(); // First calculate any pending operations
        const num = parseFloat(displayValue);
        
        let result;
        switch (func) {
            case 'sin':
                result = Math.sin(toRadians(num));
                break;
            case 'cos':
                result = Math.cos(toRadians(num));
                break;
            case 'tan':
                result = Math.tan(toRadians(num));
                break;
            case 'asin':
                result = toDegrees(Math.asin(num));
                break;
            case 'acos':
                result = toDegrees(Math.acos(num));
                break;
            case 'atan':
                result = toDegrees(Math.atan(num));
                break;
            case 'log':
                result = Math.log10(num);
                break;
            case 'ln':
                result = Math.log(num);
                break;
            case 'exp':
                result = Math.exp(num);
                break;
            case 'pow':
                displayValue += '^';
                updateDisplay();
                return;
            case 'cube':
                result = Math.pow(num, 3);
                break;
            case 'cubeRoot':
                result = Math.cbrt(num);
                break;
            case 'reciprocal':
                result = 1 / num;
                break;
        }
        
        displayValue = Number.isFinite(result) ? 
                      result.toFixed(8).replace(/\.?0+$/, '') : 
                      'Error';
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function insertConstant(constant) {
    displayValue = CONSTANTS[constant].toString();
    updateDisplay();
}

function factorial() {
    try {
        if (!displayValue) return;
        calculate();
        const num = parseInt(displayValue);
        if (num < 0 || !Number.isInteger(num)) {
            throw new Error('Invalid input for factorial');
        }
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        displayValue = result.toString();
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function convertBase(base) {
    try {
        if (!displayValue) return;
        calculate();
        const num = parseInt(displayValue);
        switch (base) {
            case 'hex':
                displayValue = num.toString(16).toUpperCase();
                break;
            case 'dec':
                displayValue = num.toString(10);
                break;
            case 'oct':
                displayValue = num.toString(8);
                break;
            case 'bin':
                displayValue = num.toString(2);
                break;
        }
        currentBase = base;
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

// Existing functions
function backspace() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function square() {
    try {
        if (!displayValue) return;
        calculate();
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
        calculate();
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
        calculate();
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
        calculate();
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
            case 'mc':
                memoryValue = 0;
                break;
            case 'mr':
                displayValue = memoryValue.toString();
                break;
            case 'mPlus':
                calculate();
                memoryValue += parseFloat(displayValue) || 0;
                break;
            case 'mMinus':
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
