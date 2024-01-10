let currentOperator = "";
let currentValue = "";
let result = "";
let newInput = false;
let calculation = false;
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const reset = document.querySelector("#reset");
display.textContent = "0";
display.value = 0;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator) {
    currentValue = parseFloat(currentValue);
    display.value = parseFloat(display.value);
    
    switch(operator) {
        case '+':
            return add(currentValue, display.value);
        case '-':
            return subtract(currentValue, display.value);
        case '×':
            return multiply(currentValue, display.value);
        case '÷':
            return divide(currentValue, display.value);
    }
}

function calculate() {
    currentValue = operate(currentOperator);
    console.log(currentValue);
    console.log(display.value);
    newInput = true;
    calculation = false;
}

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (newInput) {
            display.value = "";
            if(display.value === "0") {
                display.value = event.currentTarget.textContent;
            } else {
                display.value += event.currentTarget.textContent;
            }
            display.textContent = display.value;
            newInput = false;
        } else {
            if(currentValue === "0") {
                currentValue = event.currentTarget.textContent;
            } else {
                currentValue += event.currentTarget.textContent;
            }
            display.textContent = currentValue;
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        //assign the operator
        currentOperator = event.currentTarget.textContent;
        if (calculation) {
            display.textContent = currentValue;
        }
        display.value = currentValue;
        newInput = true;
        calculation = true;
    })
})

equals.addEventListener('click', function() {
    if (calculation)
        calculate()
    display.textContent = currentValue;
})

reset.addEventListener('click', function() {
    currentValue = "";
    display.textContent = "0";
    display.value = "0";
    currentOperator = "";
    result = "0";
    newInput = false;
    calculation = false;
})