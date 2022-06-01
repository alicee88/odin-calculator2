const displayDiv = document.querySelector('.display');
const opDisplayDiv = document.querySelector('.op-display');
const buttons = document.querySelectorAll('.input');

let displayValue = '';
let computedValue = 0;
let operator = '';
let leftSide = 0;
let rightSide = 0;

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate(op, x, y) {
    console.log("OPERATE: " + op + " X: " + x + " Y: " + y);
    switch (op) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
        default:
            return 'illegal operator';
    }
}

function updateDisplay(e) {
    if (operator) {
        console.log("Got operator " + operator);
        if (e.target.classList.contains('num')) {
            console.log("Clicked number " + e.target.dataset.key);
            displayValue += e.target.dataset.key;
            displayDiv.textContent = displayValue;
        }
        else if (e.target.classList.contains('op') || e.target.dataset.key === '=') {
            console.log("Clicked operator " + e.target.dataset.key);
            computedValue = operate(operator.dataset.key, parseInt(leftSide), parseInt(displayValue));
            displayDiv.textContent = computedValue;
            leftSide = computedValue;
            displayValue = '';
            operator.classList.remove('selected');
            operator = e.target;
            e.target.classList.add('selected');
        }
    }
    else {
        console.log("No operator");
        if (e.target.classList.contains('num')) {
            console.log("Clicked a number " + e.target.dataset.key);
            displayValue += e.target.dataset.key;
            displayDiv.textContent = displayValue;
        }
        else if (e.target.classList.contains('op')) {
            e.target.classList.add('selected');
            //operator = e.target.dataset.key;
            operator = e.target;
            console.log("SET OPERATOR TO " + operator);
            leftSide = displayValue;
            displayValue = '';
        }

    }

}

buttons.forEach(button => addEventListener('click', updateDisplay));



