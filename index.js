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
