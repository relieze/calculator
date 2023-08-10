const header = document.querySelector("h1");
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const numberbtns = document.querySelectorAll(".number");
const operatorbtns = document.querySelectorAll(".operators button");
const equalsbtn = document.querySelector(".equals");

let num1 = 0;
let num2 = 0;
let operator = "";
let answer = "";

numberbtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (equalsbtn.classList.contains("on")) {
      equalsbtn.classList.remove("on");
      screen.textContent = btn.textContent;
      num1 = +screen.textContent;
    } else if (screen.textContent.length < 9 && operator === "") {
      screen.textContent += btn.textContent;
      num1 = +screen.textContent;
    } else if (screen.textContent === operator) {
      screen.textContent = btn.textContent;
      num2 = +screen.textContent;
    } else if (screen.textContent.length < 9) {
      screen.textContent += btn.textContent;
      num2 = +screen.textContent;
    }
  })
})

operatorbtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (num1 != 0 && num2 === 0) {
      screen.textContent = btn.textContent;
      operator = btn.textContent;
    }
  })
})

equalsbtn.addEventListener("click", () => {
  if (num1 && num2 && operator) {
    answer = operate(num1, num2, operator);
    screen.textContent = answer;
    equalsbtn.classList.toggle("on");
    num1 = 0;
    num2 = 0;
    operator = "";
  }
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

function operate(num1, num2, operator) {
  switch(operator) {
    case("+"):  return add(num1, num2);
    case("-"):  return subtract(num1, num2);
    case("x"):  return multiply(num1, num2);
    case("÷"):  return divide(num1, num2);
  }
}

// just to see, for dubugging purposes, not permanent

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    header.textContent = num1 + " " + operator + " " + num2 + " = " + answer; 
  });
})