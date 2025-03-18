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
let wordSize = 32; // Default word size

// Constants
const CONSTANTS = {
    'pi': Math.PI,
    'e': Math.E,
    'phi': (1 + Math.sqrt(5)) / 2, // Golden ratio
    'gamma': 0.5772156649015329, // Euler-Mascheroni constant
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

function toggleCalculatorMode() {
    const basicButtons = document.getElementById('basic-buttons');
    const scientificButtons = document.getElementById('scientific-buttons');
    const bitButtons = document.getElementById('bit-buttons');
    const modeBtn = document.getElementById('calculator-mode-btn');
    
    if (basicButtons.style.display === 'none') {
        basicButtons.style.display = 'grid';
        scientificButtons.style.display = 'none';
        bitButtons.style.display = 'none';
        modeBtn.textContent = 'Basic';
    } else {
        basicButtons.style.display = 'none';
        scientificButtons.style.display = 'grid';
        bitButtons.style.display = 'none';
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
            case 'sinh':
                result = Math.sinh(toRadians(num));
                break;
            case 'cosh':
                result = Math.cosh(toRadians(num));
                break;
            case 'tanh':
                result = Math.tanh(toRadians(num));
                break;
            case 'asinh':
                result = Math.asinh(num);
                break;
            case 'acosh':
                result = Math.acosh(num);
                break;
            case 'atanh':
                result = Math.atanh(num);
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
            case 'log2':
                result = Math.log2(num);
                break;
            case 'abs':
                result = Math.abs(num);
                break;
            case 'floor':
                result = Math.floor(num);
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

// Bit Operations
function setWordSize(size) {
    wordSize = size;
    updateDisplay();
}

function bitOperation(op) {
    try {
        if (!displayValue) return;
        calculate(); // Calculate any pending operations
        const num = parseInt(displayValue);
        let result;

        switch (op) {
            case 'and':
                displayValue += ' & ';
                break;
            case 'or':
                displayValue += ' | ';
                break;
            case 'xor':
                displayValue += ' ^ ';
                break;
            case 'not':
                result = ~num & ((1 << wordSize) - 1);
                displayValue = result.toString();
                break;
            case 'lshift':
                displayValue += ' << ';
                break;
            case 'rshift':
                displayValue += ' >> ';
                break;
            case 'zrshift':
                displayValue += ' >>> ';
                break;
            case 'rol':
                result = ((num << 1) | (num >> (wordSize - 1))) & ((1 << wordSize) - 1);
                displayValue = result.toString();
                break;
        }
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

// Graphing Functions
let currentPlot = null;

function toggleGraphMode() {
    const graphPanel = document.getElementById('graph-panel');
    const calculatorPanels = document.getElementById('calculator-panels');
    const graphBtn = document.getElementById('graph-mode-btn');

    if (graphPanel.style.display === 'none') {
        graphPanel.style.display = 'block';
        calculatorPanels.style.display = 'none';
        graphBtn.classList.add('active');
    } else {
        graphPanel.style.display = 'none';
        calculatorPanels.style.display = 'block';
        graphBtn.classList.remove('active');
    }
}

function plotFunction() {
    const functionStr = document.getElementById('function-input').value;
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);

    try {
        // Generate x values
        const xValues = [];
        const yValues = [];
        const steps = 1000;
        const dx = (xMax - xMin) / steps;

        // Create a safe function evaluator
        const evalFunction = new Function('x',
            `try {
                with (Math) {
                    return ${functionStr};
                }
            } catch (e) {
                return NaN;
            }`
        );

        // Generate points
        for (let i = 0; i <= steps; i++) {
            const x = xMin + i * dx;
            xValues.push(x);
            yValues.push(evalFunction(x));
        }

        // Create the plot
        const trace = {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#1a73e8' }
        };

        const layout = {
            title: functionStr,
            xaxis: { title: 'x' },
            yaxis: { title: 'y' },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: { t: 40, b: 40, l: 40, r: 20 }
        };

        Plotly.newPlot('graph-container', [trace], layout);
    } catch (error) {
        alert('Error plotting function: ' + error.message);
    }
}