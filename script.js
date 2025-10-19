// Arithmetic functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Error" : a / b; }

function operate(a, operator, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "Error";
    }
}

// DOM elements
const resultDiv = document.getElementById('result');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#clear');
const equalsBtn = document.querySelector('#equals');

// Calculator state
let currentInput = '';
let storedOperand = null;
let storedOperator = null;

// Digit button clicks
digits.forEach(digit => {
    digit.addEventListener('click', () => {
        currentInput += digit.textContent;
        resultDiv.textContent = currentInput;
    });
});

// Operator button clicks
// Loop through all operator buttons (+, -, *, /)
operators.forEach(op => {
    // Add a click event listener to each operator button
    op.addEventListener('click', () => {

        // If the user hasn't typed a number yet, do nothing
        if (currentInput === '') return;

        // If no operand is stored yet, store the current input as the first operand
        if (storedOperand === null) {
            storedOperand = parseFloat(currentInput); // Convert input string to number
        } 
        // If there is already a stored operator, calculate the result with the previous operator
        else if (storedOperator) {
            // Perform the calculation: storedOperand (previous) operator currentInput (new)
            storedOperand = operate(storedOperand, storedOperator, parseFloat(currentInput));
            // Display the intermediate result
            resultDiv.textContent = storedOperand;
        }

        // Store the operator that was just clicked for the next calculation
        storedOperator = op.textContent;

        // Clear the current input so the user can type the next number
        currentInput = '';
    });
});


// Equals button click
equalsBtn.addEventListener('click', () => {
    // Check if there is a stored operand, an operator, and the user has typed a second number
    if (storedOperand !== null && storedOperator && currentInput !== '') {

        // Perform the calculation using the stored operand, operator, and current input
        const result = operate(storedOperand, storedOperator, parseFloat(currentInput));

        // Display the result on the calculator screen
        resultDiv.textContent = result;

        // Store the result as the new operand for chaining calculations
        storedOperand = result;

        // Clear the current input so the user can type the next number
        currentInput = '';

        // Clear the stored operator since this operation is complete
        storedOperator = null;
    }
});


// Clear button click
clearBtn.addEventListener('click', () => {
    currentInput = '';
    storedOperand = null;
    storedOperator = null;
    resultDiv.textContent = '';
});
