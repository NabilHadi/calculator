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
let firstNum = "";
let secondNum = "";
let shouldClearDisplay = false;
let currentOperator = null;
let displayValue = "0";

const display = document.querySelector(".display");

function updateDisplay() {
  display.textContent = displayValue;
}

function clearState() {
  firstNum = "";
  secondNum = "";
  shouldClearDisplay = false;
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

function evaluate() {
  firstNum = operate(currentOperator, Number(firstNum), Number(secondNum));
  displayValue = firstNum;
  secondNum = "";
  updateDisplay();
}

function calcBtnClickHandler(event) {
  const btnValue = event.target.dataset.value;
  console.log(btnValue);
  if (event.target.dataset.type === "digit") {
    if (displayValue == "0" || shouldClearDisplay) {
      displayValue = btnValue;
      shouldClearDisplay = false;
    } else {
      displayValue += btnValue;
    }
    updateDisplay();
  } else if (event.target.dataset.type === "operator") {
    if (firstNum === "") {
      firstNum = displayValue;
      currentOperator = btnValue;
      displayValue = "0";
      updateDisplay();
    } else if (secondNum === "" && currentOperator) {
      if (Number(displayValue) === 0 && currentOperator === "/") {
        clearState();
        display.textContent = "OOPS! division by 0";
        return;
      }
      secondNum = displayValue;
      console.log({ secondNum, firstNum });
      evaluate();
      currentOperator = btnValue;
      shouldClearDisplay = true;
    } else if (secondNum === "") {
      secondNum = displayValue;
      currentOperator = btnValue;
      shouldClearDisplay = true;
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
    secondNum = displayValue;
    evaluate();
    currentOperator = null;
    shouldClearDisplay = true;
  } else if (btnValue === "backspace") {
    backspaceHandler();
  }
}

const calcBtns = document.querySelectorAll(".calc-btn");
calcBtns.forEach((btn) => {
  btn.addEventListener("click", calcBtnClickHandler);
});
