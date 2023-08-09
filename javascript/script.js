let num1 = 0;
let num2 = 0;
let operator = "";

num1 = prompt("num1:")
operator = prompt("operator:")
num2 = prompt("num2:")

operate(num1, num2, operator);

function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

console.log(num1 + " " + operator + " " + num2);

function operate(num1, num2, operator) {
  switch(operator) {
    case("+"):  console.log(add(num1, num2));
                break;
    case("-"):  console.log(subtract(num1, num2));
                break;
    case("*"):  console.log(multiply(num1, num2));
                break;
    case("/"):  console.log(divide(num1, num2));
                break;
  }
}