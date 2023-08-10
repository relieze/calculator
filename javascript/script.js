const header = document.querySelector("h1");
const screen = document.querySelector(".screen");
const numberbtns = document.querySelectorAll(".number");
const operatorbtns = document.querySelectorAll(".operators button");
const equalsbtn = document.querySelector(".equals");

let num1 = 0;
let num2 = 0;
let operator = "";

numberbtns.forEach(btn => {
  btn.addEventListener("click", event => {
    if (screen.textContent.length < 9 && operator === "") {
      screen.textContent += event.target.textContent;
      num1 = +screen.textContent;
    } else if (screen.textContent === operator) {
      screen.textContent = event.target.textContent;
      num2 = +screen.textContent;
    } else if (screen.textContent.length < 9) {
      screen.textContent += event.target.textContent;
      num2 = +screen.textContent;
    }
  })
})

operatorbtns.forEach(btn => {
  btn.addEventListener("click", event => {
    if (num2 === 0) {
      screen.textContent = event.target.textContent;
      operator = btn.textContent;
    }
  })
})

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

header.textContent = num1 + " " + operator + " " + num2; // just to see, not permanent

function operate(num1, num2, operator) {
  switch(operator) {
    case("+"):  return add(num1, num2);
    case("-"):  return subtract(num1, num2);
    case("*"):  return multiply(num1, num2);
    case("/"):  return divide(num1, num2);
  }
}