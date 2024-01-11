let currentOperator = "";
let currentValue = "0";
let calculation = false;
let secondOperand = false;
let error = false;
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const display = document.querySelector("#display");
const equals = document.querySelector("#equals");
const reset = document.querySelector("#reset");
display.textContent = "0";
display.value = "";

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

function operate(first, second, operator) {
    first = parseFloat(first);
    second = parseFloat(second);
    
    switch(operator) {
        case '+':
            return add(first, second);
        case '-':
            return subtract(first, second);
        case '*':
            return multiply(first, second);
        case '/':
            if (second === 0)
                return "Cannot divide by zero";
            //round to two places
            return Math.round(divide(first, second) * 100)/100;
    }
}

function clear() {
    currentValue = "0";
    display.textContent = "0";
    display.value = "0";
    currentOperator = "";
    calculation = false;
    secondOperand = false;
}

//todo
//1. join the string with numbers as you input - DONE
//2. for operators, assign the current operator - DONE
//3. equals should calculate the value - DONE
//4. When an operator is assigned, the display must reset when inputting a new number (clear entry) - DONE
//4.1. Store the currentValue, but make a new display.textContent - DONE
//5. Similarly, when a calculation has been done, then the display must be reset - DONE
//6. When using a string of operations, the pair of evaluations before must be evaluated, then continue - DONE
//edge case: 0s must not be joined - DONE
numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        //1
        if (currentOperator && !secondOperand) {
            currentValue = "";
            secondOperand = true;
        }

        if (display.textContent != "0") {
            currentValue += event.currentTarget.value;
        } else {
            currentValue = event.currentTarget.value;
        }

        display.textContent = currentValue;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        //2
        //check edge case if equals has been used then a new operator is used
        if(!currentOperator || calculation) {
            currentOperator = event.currentTarget.value;
            display.value = calculation ? currentValue : display.value;
        } else {
            //so if a second operator along with a new current value is incoming
            //12 + 7 (- 5)... => 19 - 5
            //1. We need to have a non-empty currentOperator
            //2. Evaluate, so use the operate function to calculate it
            //3. Do step 2 before assigning a new operator
            //4. Set display.value to the evaluated value
            //edge case: what if we operate without a second value?
            //consequent operations through operators should not be allowed
            //Scenario: 12 + ... + + + + should not evaluate
            display.value = operate(display.value, currentValue, currentOperator);
            currentOperator = event.currentTarget.value;
            display.textContent = display.value;
        }
        secondOperand = false;
    })
})

equals.addEventListener('click', function() {
    //3
    if (display.value) {
        display.value = operate(display.value, currentValue, currentOperator);
        display.textContent = display.value;
        calculation = true;
        secondOperand = false;
    } else {
        display.value = currentValue;
    }
})

reset.addEventListener('click', clear);