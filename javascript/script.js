const header = document.querySelector("h1");
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const numberBtns = document.querySelectorAll(".number");
const operatorsDiv = document.querySelector(".operators")
const operatorBtns = document.querySelectorAll(".operators button");
const equalsBtn = document.querySelector(".equals");

let num1 = "";
let num2 = "";
let operator = "";
let answer = "";

numberBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (equalsBtn.classList.contains("on")) {
      equalsBtn.classList.remove("on");
      screen.textContent = btn.textContent;
      num1 = +screen.textContent;
    } else if (operatorsDiv.classList.contains("on")) {
      operatorsDiv.classList.remove("on");
      screen.textContent = btn.textContent;
      num2 = +screen.textContent;
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

operatorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (num1 !== "" && num2 === "") {
      screen.textContent = btn.textContent;
      operator = btn.textContent;
    } else if (num1 !== "" && num2 !== "") {
      evaluate();
      operatorsDiv.classList.add("on");
      operator = btn.textContent;
      num1 = answer;
      num2 = "";
    }
  })
})

equalsBtn.addEventListener("click", () => {
  evaluate();
  equalsBtn.classList.add("on");
  num1 = "";
  num2 = "";
  operator = "";
})

function evaluate() {
  if (num1 !== "" && operator === "÷" && num2 === 0) {
    screen.textContent = "Haha, nice try: Infinity";
  } else if (num1 !== "" && num2 !== "" && operator) {
    answer = operate(num1, num2, operator);
    screen.textContent = answer;
  }
}

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