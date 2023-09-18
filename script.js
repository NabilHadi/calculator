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
  if (b == 0) return "undefined: division by 0";
  return a / b;
}

let num1, currentOperator, num2;
let clearDisplay = true;

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "/":
      return divide(a, b);
    case "*":
      return multiply(a, b);
  }
}

let displayValue = 0;
const displayDiv = document.querySelector("#display");
const addBtn = document.querySelector("[data-value='+']");
const subtractBtn = document.querySelector("[data-value='-']");
const multiplyBtn = document.querySelector("[data-value='*']");
const divideBtn = document.querySelector("[data-value='/']");
const equalBtn = document.querySelector("[data-value='=']");
const clearBtn = document.querySelector("[data-value='clear']");

addBtn.addEventListener("click", operatorClickHandler);
subtractBtn.addEventListener("click", operatorClickHandler);
multiplyBtn.addEventListener("click", operatorClickHandler);
divideBtn.addEventListener("click", operatorClickHandler);

equalBtn.addEventListener("click", (e) => {
  if (num1 == null || currentOperator == null) return;
  num2 = displayValue;
  if (currentOperator == "/" && num2 == 0) {
    clearState();
    displayDiv.textContent = "Divide by 0 SMH";
    return;
  }
  let result = operate(currentOperator, num1, num2);
  populateDisplay(result);
  num1 = null;
  num2 = null;
  clearDisplay = true;
});

clearBtn.addEventListener("click", clearState);

function clearState() {
  num1 = null;
  num2 = null;
  currentOperator = null;
  clearDisplay = true;
  populateDisplay(0);
}

const numbersBtns = document.querySelectorAll(".number-btn");
numbersBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", numBtnClickHandler);
});

function numBtnClickHandler(e) {
  if (clearDisplay) {
    populateDisplay(e.target.textContent);
    clearDisplay = false;
  } else {
    populateDisplay(displayValue + e.target.textContent);
  }
}

function operatorClickHandler(e) {
  if (num1 == null) {
    num1 = displayValue;
  } else {
    num2 = displayValue;
    if (currentOperator == "/" && num2 == 0) {
      clearState();
      displayDiv.textContent = "Divide by 0 SMH";
      return;
    }
    let result = operate(currentOperator, num1, num2);
    populateDisplay(result);
    num1 = result;
    num2 = null;
  }
  currentOperator = e.target.dataset.value;
  clearDisplay = true;
}

function populateDisplay(str) {
  displayValue =
    Math.round((Number(str) + Number.EPSILON) * 10000000) / 10000000;
  displayDiv.textContent = displayValue;
}
