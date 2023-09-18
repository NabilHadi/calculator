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

addBtn.addEventListener("click", operatorClickHandler);
subtractBtn.addEventListener("click", operatorClickHandler);
multiplyBtn.addEventListener("click", operatorClickHandler);
divideBtn.addEventListener("click", operatorClickHandler);

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
  currentOperator = e.target.dataset.value;
  if (num1 == null) {
    num1 = displayValue;
  } else {
    num2 = displayValue;
    let result = operate(currentOperator, num1, num2);
    populateDisplay(result);
    num1 = result;
    num2 = null;
  }
  clearDisplay = true;
}

function populateDisplay(str) {
  displayDiv.textContent = str;
  displayValue = Number(str);
}
