const displayDiv = document.querySelector('.display');
const opDisplayDiv = document.querySelector('.op-display');
const buttons = document.querySelectorAll('.input');
const decimal = document.querySelector('.decimal');

let displayValue = '';
let operator = '';
let leftSide = 0;
let prevKey = '';

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate(op, x, y) {
    let answer = 0;
    switch (op) {
        case '+':
            answer = add(x, y);
            break;
        case '-':
            answer = subtract(x, y);
            break;
        case '*':
            answer = multiply(x, y);
            break;
        case '/':
            if (y === 0) {
                return 'No dividing by 0';
            }
            answer = divide(x, y);
            break;
        default:
            return 'illegal operator';
    }
    return answer.toPrecision(9) / 1;
}

function updateDisplay(e) {
    if (e.target.classList.contains('num')) {
        if (displayValue.length < 10) {
            displayValue += e.target.dataset.key;
            displayDiv.textContent = (Number)(displayValue);
        }
        prevKey = 'num';
    } else if (e.target.classList.contains('op')) {
        if (operator) {
            if (displayValue) {
                if (leftSide) {
                    displayValue = operate(operator.dataset.key, parseInt(leftSide), parseInt(displayValue));
                    displayDiv.textContent = displayValue;
                }
                leftSide = displayValue;
                displayValue = '';
                decimal.disabled = false;
            }
            operator.classList.remove('selected');
        }
        else {
            if (prevKey === 'num') {
                leftSide = displayValue;
                displayValue = '';
                decimal.disabled = false;
            }
        }
        operator = e.target;
        operator.classList.add('selected');
        prevKey = 'op';
    } else if (e.target.dataset.key === '=') {
        if (operator) {
            displayValue = operate(operator.dataset.key, (Number)(leftSide), (Number)(displayValue));
            displayDiv.textContent = displayValue;
            leftSide = displayValue;
            displayValue = '';
            operator.classList.remove('selected');
            operator = '';
            decimal.disabled = false;
        }
        prevKey = '=';
    } else if (e.target.dataset.key === 'clr') {
        if (operator) {
            operator.classList.remove('selected');
            operator = '';
        }
        displayValue = '';
        leftSide = 0;
        prevKey = '';
        displayDiv.textContent = '';
        decimal.disabled = false;
    } else if (e.target.dataset.key === '.') {
        if (!displayValue) {
            displayValue = '0';
        }
        displayValue += '.';
        displayDiv.textContent = displayValue;
        e.target.disabled = true;
    } else if (e.target.dataset.key === 'del') {
        if (displayValue && prevKey === 'num') {
            displayValue = displayValue.slice(0, - 1);
            displayDiv.textContent = displayValue;
        }

    }
}

buttons.forEach(button => addEventListener('click', updateDisplay));



