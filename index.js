const sum = (x, y) => {
  return Number(x) + Number(y);
};

const sub = (x, y) => {
  return Number(x) - Number(y);
};

const multiply = (x, y) => {
  return Number(x) * Number(y);
};

const divide = (x, y) => {
  return Number(x) / Number(y);
};

const operate = (firstNum, operator, secondNum) => {
  if (operator === "+") return sum(firstNum, secondNum);
  if (operator === "-") return sub(firstNum, secondNum);
  if (operator === "*") return multiply(firstNum, secondNum);
  if (operator === "/") return divide(firstNum, secondNum);
};

function isNumber(n) {
  return !isNaN(n);
}

function isValidOperator(str) {
  const regExpIsOprator = new RegExp(/^(\+|-|\*|\/)$/);
  return regExpIsOprator.test(str);
}

function setTopText(str) {
  document.querySelector("#top-text").textContent = str;
}

function setBottomText(str) {
  document.querySelector("#bottom-text").textContent = str;
}

function getBottumText() {
  return document.querySelector("#bottom-text").textContent;
}

let currentOperator = null;
let firstValue = null;
let secondValue = null;
let isSecond = false;
let isClear = false;

function calc(operator) {
  console.log("calc called");
  if (!isValidOperator(operator)) return;
  console.log(`operator: ${operator}`);

  if (!currentOperator) currentOperator = operator;
  console.log(firstValue);
  if (!firstValue) {
    console.log("empty first Value");
    firstValue = 0;
  }
  setTopText(`${firstValue} ${currentOperator}`);
  console.log("not empty first Value");
  isSecond = true;
  if (!secondValue) {
    currentOperator = operator;
    setTopText(`${firstValue} ${currentOperator}`);
    return;
  }
  setBottomText("");

  let firstNum = Number(firstValue);
  let secondNum = Number(secondValue);

  console.log(firstNum, currentOperator, secondNum);

  if (isNumber(firstNum) && isNumber(secondNum)) {
    console.log("valid");
    setBottomText(operate(Number(firstNum), currentOperator, Number(secondNum)));
    firstValue = getBottumText();
    secondValue = null;
    if (currentOperator !== operator) currentOperator = operator;
    setTopText(`${firstValue} ${currentOperator}`);
  } else {
    console.log("not valid");
  }
}

function equal() {
  console.log("equal called");
  if (!currentOperator) return;
  console.log(`currentOperator: ${currentOperator}`);
  console.log(firstValue, secondValue);

  if (!firstValue) return;
  isSecond = true;
  if (!secondValue) {
    secondValue = firstValue;
  }
  isSecond = false;

  let firstNum = Number(firstValue);
  let secondNum = Number(secondValue);

  if (isNumber(firstNum) && isNumber(secondNum)) {
    console.log("valid");
    setBottomText(operate(Number(firstNum), currentOperator, Number(secondNum)));
    setTopText(`${firstNum} ${currentOperator} ${secondNum} =`);
    firstValue = getBottumText();
    secondValue = null;
    isClear = true;
  } else {
    console.log("not valid");
  }
}

function reset() {
  console.log("clear called");
  setTopText("");
  setBottomText("0");
  currentOperator = null;
  isSecond = false;
  firstValue = null;
  secondValue = null;
  isClear = false;
}

function digitClick(event) {
  if (!event.target.dataset.key) return;

  if (isSecond) {
    if (secondValue == null) secondValue = event.target.dataset.key;
    else secondValue += event.target.dataset.key;

    setBottomText(secondValue);
  } else {
    if (firstValue == null || isClear) {
      firstValue = event.target.dataset.key;
      secondValue = null;
      setTopText("");
      isClear = false;
    }
    else firstValue += event.target.dataset.key;

    setBottomText(firstValue);
  }
}

function flipNumber() {
  if (firstValue) {
    firstValue = Number(firstValue) * (-1);
    setBottomText(firstValue);
  }
}

function percentage() {
  if (firstValue) {
    firstValue = Number(firstValue) / 100;
    setBottomText(firstValue);
  }
}

function addDot() {
  if (firstValue && !firstValue.endsWith(".")) {
    firstValue += ".";
    setBottomText(firstValue);
  } else if (!firstValue) {
    firstValue = "0.";
    setBottomText(firstValue);
  }
}

const digitsConatiner = document.querySelector("#btns-container");
digitsConatiner.addEventListener("click", digitClick);
