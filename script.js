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

let firstNumber = null;
let secondNumber = null;
let operator = null;

function operate(_operator, a, b) {
  switch (_operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      console.error("Unknown operator!");
      return "";
  }
}

let displayValue = "0";

function handleNumBtnClick(e) {
  let number = e.target.dataset.numValue;
  if (displayValue === "0") {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function handleOperatorClick(e) {
  let _operator = e.target.dataset.operatorValue;
  if (firstNumber === null) {
    firstNumber = Number(displayValue);
  } else if (operator === "/" && Number(displayValue) === 0) {
    displayDiv.textContent = "Can not divide by 0 :(";
  } else {
    if (secondNumber === null) {
      secondNumber = operate(operator, firstNumber, Number(displayValue));
    } else {
      secondNumber = operate(operator, secondNumber, Number(displayValue));
    }
    displayValue = secondNumber;
    updateDisplay();
  }
  displayValue = "0";
  operator = _operator;
}

function handleEqualBtnClick(e) {
  if (firstNumber === null || operator === null) return;
  console.log({ firstNumber, secondNumber, operator, displayValue });
  if (operator === "/" && Number(displayValue) === 0) {
    displayDiv.textContent = "Can not divide by 0 :(";
    displayValue = "0";
  } else {
    if (secondNumber !== null) {
      displayValue = operate(operator, secondNumber, Number(displayValue));
    } else {
      displayValue = operate(operator, firstNumber, Number(displayValue));
    }
    updateDisplay();
  }
  firstNumber = null;
  secondNumber = null;
  operator = null;
}

function handleClearBtn(e) {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  displayValue = "0";
  updateDisplay();
}

function handleDotBtnClick(e) {
  if (displayValue.includes(".")) {
    console.log("includes");
    return;
  } else {
    displayValue += ".";
  }
  updateDisplay();
}

function handleDelBtnClick() {
  let strValue = displayValue + "";
  displayValue = strValue.substring(0, strValue.length - 1);
  updateDisplay();
}

function handleSignBtnClick() {
  let numValue = Number(displayValue);
  displayValue = numValue * -1;
  updateDisplay();
}

const displayDiv = document.querySelector("#display");
function updateDisplay() {
  if ((displayValue + "").endsWith(".")) {
    displayDiv.textContent = displayValue;
  } else {
    displayDiv.textContent = Math.round(Number(displayValue) * 10000) / 10000;
  }
}

const numBtns = document.querySelectorAll(".num-btn");
numBtns.forEach(btn => {
  btn.addEventListener("click", handleNumBtnClick);
});

const operatorBtns = document.querySelectorAll(".operator-btn");
operatorBtns.forEach(btn => {
  btn.addEventListener("click", handleOperatorClick);
});

const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", handleEqualBtnClick);

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", handleClearBtn);

const dotBtn = document.querySelector("#dot-btn");
dotBtn.addEventListener("click", handleDotBtnClick);

const delBtn = document.querySelector("#del-btn");
delBtn.addEventListener("click", handleDelBtnClick);

const signBtn = document.querySelector("#sign-btn");
signBtn.addEventListener("click", handleSignBtnClick);
