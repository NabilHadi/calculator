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

function operate(operator = "+", a, b) {
  switch (operator) {
    case "+":
      return Math.round(1000 * add(a, b)) / 1000;
    case "-":
      return Math.round(1000 * subtract(a, b)) / 1000;
    case "*":
      return Math.round(1000 * multiply(a, b)) / 1000;
    case "/":
      return Math.round(1000 * divide(a, b)) / 1000;
    default:
      return "Unknown";
  }
}

let storedNum = null;
let currentOperator = null;
let displayValue = "0";
const display = document.querySelector(".display");

function updateDisplay() {
  display.textContent = displayValue;
}

function clearState() {
  storedNum = null;
  currentOperator = null;
  displayValue = "0";
  updateDisplay();
}

function backspaceHandler() {
  if (displayValue === "0") return;
  displayValue = displayValue + "";
  displayValue = displayValue.substring(0, displayValue.length - 1);
  if (displayValue.length === 0) {
    displayValue = "0";
  }
  updateDisplay();
}

function calcBtnClickHandler(event) {
  const btnValue = event.target.dataset.value;
  console.log(btnValue);
  if (event.target.dataset.type === "digit") {
    if (displayValue == "0") {
      displayValue = btnValue;
    } else {
      displayValue += btnValue;
    }
    updateDisplay();
  } else if (event.target.dataset.type === "operator") {
    if (!currentOperator) {
      currentOperator = btnValue;
      storedNum = displayValue;
      displayValue = "0";
      updateDisplay();
    } else if (storedNum) {
      if (Number(displayValue) === 0 && currentOperator === "/") {
        display.textContent = "OOPS! division by 0";
        return;
      }
      displayValue = operate(
        currentOperator,
        Number(storedNum),
        Number(displayValue)
      );
      updateDisplay();
      storedNum = displayValue;
      displayValue = "0";
      currentOperator = btnValue;
    }
  } else if (btnValue === "clear") {
    clearState();
  } else if (btnValue === "=") {
    if (Number(displayValue) === 0 && currentOperator === "/") {
      clearState();
      display.textContent = "OOPS! division by 0";
      return;
    }
    if (!currentOperator) return;
    displayValue = operate(
      currentOperator,
      Number(storedNum),
      Number(displayValue)
    );
    updateDisplay();
    storedNum = displayValue;
    currentOperator = null;
  } else if (btnValue === "backspace") {
    backspaceHandler();
  }
}

const calcBtns = document.querySelectorAll(".calc-btn");
calcBtns.forEach((btn) => {
  btn.addEventListener("click", calcBtnClickHandler);
});
