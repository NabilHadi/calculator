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
      return Math.round((divide(a, b) + Number.EPSILON) * 10000000) / 10000000;
    case "*":
      return (
        Math.round((multiply(a, b) + Number.EPSILON) * 10000000) / 10000000
      );
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
const decimalBtn = document.querySelector("[data-value='.']");
const backspaceBtn = document.querySelector("[data-value='backspace']");

addBtn.addEventListener("click", () => operatorClickHandler("+"));
subtractBtn.addEventListener("click", () => operatorClickHandler("-"));
multiplyBtn.addEventListener("click", () => operatorClickHandler("*"));
divideBtn.addEventListener("click", () => operatorClickHandler("/"));

equalBtn.addEventListener("click", equalBtnClickHandler);

clearBtn.addEventListener("click", clearState);

decimalBtn.addEventListener("click", decimalClickHandler);

backspaceBtn.addEventListener("click", backspaceClickHandler);

function equalBtnClickHandler(e) {
  if (num1 == null || currentOperator == null) return;
  num2 = displayValue;
  if (currentOperator == "/" && num2 == 0) {
    clearState();
    updateDisplayContent("Divide by 0 SMH");
    return;
  }
  let result = operate(currentOperator, num1, num2);
  updateDisplayContent(result);
  updateDisplayValue(result);
  num1 = null;
  num2 = null;
  clearDisplay = true;
}

function decimalClickHandler() {
  if (displayDiv.textContent.includes(".")) return;

  updateDisplayContent(displayDiv.textContent + ".");
}

function backspaceClickHandler() {
  if (displayDiv.textContent === "0") return;

  if (displayDiv.textContent.length > 1) {
    updateDisplayContent(
      displayDiv.textContent.substring(0, displayDiv.textContent.length - 1)
    );
    updateDisplayValue(displayDiv.textContent);
  } else {
    updateDisplayContent(0);
    updateDisplayValue(0);
  }
}

function clearState() {
  num1 = null;
  num2 = null;
  currentOperator = null;
  clearDisplay = true;
  updateDisplayContent(0);
  updateDisplayValue(0);
}

const numbersBtns = document.querySelectorAll(".number-btn");
numbersBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", () =>
    numBtnClickHandler(numBtn.textContent)
  );
});

function numBtnClickHandler(num) {
  if (clearDisplay) {
    updateDisplayContent(num);
    updateDisplayValue(num);
    clearDisplay = false;
  } else {
    updateDisplayContent(displayDiv.textContent + num);
    updateDisplayValue(displayDiv.textContent);
  }
}

function operatorClickHandler(operator) {
  if (num1 == null) {
    num1 = displayValue;
  } else {
    num2 = displayValue;
    if (currentOperator == "/" && num2 == 0) {
      clearState();
      updateDisplayContent("Divide by 0 SMH");
      return;
    }
    let result = operate(currentOperator, num1, num2);
    updateDisplayContent(result);
    updateDisplayValue(result);
    num1 = result;
    num2 = null;
  }
  currentOperator = operator;
  clearDisplay = true;
}

function updateDisplayContent(str) {
  displayDiv.textContent = str;
}

function updateDisplayValue(value) {
  if (typeof value === "string") {
    if (value.endsWith(".")) {
      let newValue = value.substring(0, value.length - 1);
      displayValue = Number(newValue);
    } else {
      displayValue = Number(value);
    }
  } else if (typeof value === "number") {
    displayValue = value;
  }
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numBtnClickHandler(e.key);
      break;
    case "-":
    case "*":
    case "/":
    case "+":
      operatorClickHandler(e.key);
      break;
    case "=":
    case "Enter":
      equalBtnClickHandler();
      break;
    case "Backspace":
      backspaceClickHandler();
      break;
    case ".":
      decimalClickHandler();
  }
});
