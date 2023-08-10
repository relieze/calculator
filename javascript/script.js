const answerLog = document.querySelector(".answer");
const expressionLog = document.querySelector(".expression");
const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const numberBtns = document.querySelectorAll(".number");
const operatorsDiv = document.querySelector(".operators")
const operatorBtns = document.querySelectorAll(".operators button");
const equalsBtn = document.querySelector(".equals");
const clearAllBtn = document.querySelector(".clearAll");

let num1 = "";
let num2 = "";
let operator = "";
let answer = "";

numberBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (equalsBtn.classList.contains("on") ||             // right after equals button is pressed
        equalsBtn.classList.contains("error")) {          // in the case that it is after /0 error message
      equalsBtn.classList.remove("on");
      equalsBtn.classList.remove("error");
      screen.style.fontSize = "4.5rem";
      screen.textContent = btn.textContent;
      num1 = +screen.textContent;
    } else if (operatorsDiv.classList.contains("chain")) {// right after a chaining operator is pressed
      operatorsDiv.classList.remove("chain");
      screen.textContent = btn.textContent;
      num2 = +screen.textContent;
    } else if ( screen.textContent.length < 9 && operator === "") { // there is no operator, so must be num1
      screen.textContent += btn.textContent;
      num1 = +screen.textContent;
    } else if (screen.textContent === operator) {         // right after an operator is pressed
      screen.textContent = btn.textContent;
      num2 = +screen.textContent;
    } else if (screen.textContent.length < 9) {           // if user isn't done inputting to num2
      screen.textContent += btn.textContent;
      num2 = +screen.textContent;
    }
  })
})

operatorBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (num1 !== "" && num2 === "") {                     // only first number exists - regular
      toggleOperator(btn);
      screen.textContent = btn.textContent;
      operator = btn.textContent;
    } else if (num1 !== "" && num2 !== "") {              // both numbers exist
      evaluate();
      if (!equalsBtn.classList.contains("error")) {       // chaining operations
        operatorsDiv.classList.add("chain");
        toggleOperator(btn);
        operator = btn.textContent;
        num1 = answer;
        num2 = "";
      } else {                                            // in the case that evaluation leads to /0 error
        toggleOperator();
        num1 = "";
        num2 = "";
        operator = "";
      }
    } else if ( equalsBtn.classList.contains("on") ||     // right after equals button is pressed
                equalsBtn.classList.contains("error")) {  // in the case that it is after /0 error message
      equalsBtn.classList.remove("on");
      equalsBtn.classList.remove("error")
      operatorsDiv.classList.add("chain");
      toggleOperator(btn);
      screen.style.fontSize = "4.5rem";
      screen.textContent = btn.textContent;
      operator = btn.textContent;
      num1 = answer;
      num2 = "";
    }
  })
})

equalsBtn.addEventListener("click", () => {
  if (num1 !== "" && num2 !== "" && operator !== "") {
    toggleOperator();
    evaluate();
    if (!(equalsBtn.classList.contains("error"))) equalsBtn.classList.add("on");
    num1 = "";
    num2 = "";
    operator = "";
  }
})

clearAllBtn.addEventListener("click", () => {
  num1 = "";
  num2 = "";
  operator = "";
  answer = "";
  equalsBtn.classList.remove("on");
  equalsBtn.classList.remove("error");
  operatorsDiv.classList.remove("chain");
  toggleOperator();
  screen.textContent = "";
  screen.style.fontSize = "4.5rem";
  answerLog.textContent = "CALCULATOR";
  expressionLog.textContent = "";
})

function toggleOperator(operator = "none") {
  operatorBtns.forEach(btn => {
    if (btn === operator) btn.classList.add("on");
    else btn.classList.remove("on");
  })
}

function evaluate() {
  if (num1 !== "" && operator === "÷" && num2 === 0) {
    screen.style.fontSize = "2.5rem";
    screen.textContent = "Haha, nice try: Can't Divide by 0";
    equalsBtn.classList.add("error");
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
  if (btn != clearAllBtn) {
    btn.addEventListener("click", () => {
      answerLog.textContent ="Ans: " + answer; 
      expressionLog.textContent = num1 + " " + operator + " " + num2;
    });
  }
})

