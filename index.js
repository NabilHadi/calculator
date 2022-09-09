const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operators = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
};

const operate = (operator, x, y) => {
  x = Number(x);
  y = Number(y);
  switch (operator) {
    case operators.add:
      return add(x, y);
    case operators.subtract:
      return subtract(x, y);
    case operators.multiply:
      return multiply(x, y);
    case operators.divide:
      if (y === 0) return "Cannot divide by 0";
      return divide(x, y);
    default:
      return "Invalid operator";
  }
};

const display = document.querySelector(".display");
display.textContent = "";

function digitButtonClickHandler(e) {
  if (display.textContent.trim() === "0") {
    display.textContent = e.target.dataset.digit;
  } else {
    display.textContent += e.target.dataset.digit;
  }
}

function isOperator(char) {
  switch (char) {
    case operators.add:
    case operators.subtract:
    case operators.multiply:
    case operators.divide:
      return true;
    default:
      return false;
  }
}

function functionButtonClickHandler(e) {
  const operation = e.target.dataset.function;
  if (operation === "c") {
    display.textContent = "";
  } else if (operation === "=") {
    let ops = display.textContent.split(/(\*|\+|\/|-)/gi);
    if (ops.length < 3 || ops[2] === "") return;

    let ops2 = [];
    for (let i = 0; i < ops.length; i += 2) {
      if (Number.isNaN(Number(ops[i]))) {
        display.textContent = "Error";
        return;
      }
      if (ops[i + 1] === operators.add || ops[i + 1] === operators.subtract) {
        ops2.push(ops[i], ops[i + 1]);
      } else {
        if (ops[i + 2]) {
          ops[i + 2] = operate(ops[i + 1], ops[i], ops[i + 2]);
        } else {
          ops2.push(ops[i]);
        }
      }
    }

    let currOperation = "";
    const result = ops2.reduce((total, currElm) => {
      if (isOperator(currElm)) {
        currOperation = currElm;
      } else {
        if (currElm === "") return total;
        total = operate(currOperation, Number(total), Number(currElm));
      }
      return total;
    });
    display.textContent = Math.round(Number(result) * 1000) / 1000;
  } else if (operation === "backspace") {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    const textLength = display.textContent.length;
    if (
      textLength === 0 ||
      isOperator(display.textContent[textLength - 1]) ||
      (operation === "." && display.textContent.includes("."))
    )
      return;
    display.textContent += operation;
  }
}

const digitButtons = Array.from(document.querySelectorAll(".digit-button"));
digitButtons.forEach((digitBtn) => {
  digitBtn.addEventListener("click", digitButtonClickHandler);
});

const functionButtons = Array.from(
  document.querySelectorAll(".function-button")
);
functionButtons.forEach((funcBtn) => {
  funcBtn.addEventListener("click", functionButtonClickHandler);
});
