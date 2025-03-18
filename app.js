// ... Previous JavaScript content ...

// New Constants
const CONSTANTS = {
    'pi': Math.PI,
    'e': Math.E,
    'phi': (1 + Math.sqrt(5)) / 2, // Golden ratio
    'gamma': 0.5772156649015329, // Euler-Mascheroni constant
};

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

// Bit Operations
let wordSize = 32; // Default word size

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

// Enhanced Scientific Functions
function scientificFunction(func) {
    try {
        if (!displayValue) return;
        calculate(); // First calculate any pending operations
        const num = parseFloat(displayValue);
        
        let result;
        switch (func) {
            // Previous scientific functions...

            // Hyperbolic functions
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

// Add all previous JavaScript code here
