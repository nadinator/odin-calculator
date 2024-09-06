// Calculator for Odin Project, by Nadim Bou Alwan

// BUGS:
// 1. Dots
// 2. Pressing number after equals adds to current displayed number instead of clearing it

let res = 0;
let startedNumber = false;
let dotPressed = false;
let numberStack = [];

let opMap = {
    plus: (a, b) => a + b,
    minus: (a, b) => a - b,
    divide: (a, b) => (b !== 0 ? a / b : alert("Div by zero")),
    multiply: (a, b) => a * b,
};

const display = document.querySelector(".display");
display.textContent = res;

// Add logic for number buttons
[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((x) => {
    const but = document.querySelector(`._${x}`);
    but.addEventListener("click", () => {
        if (!startedNumber) {
            startedNumber = true;
            display.textContent = x;
        } else {
            display.textContent += x;
        }
    });
});

// Dot
const dot_button = document.querySelector(".dot");
dot_button.addEventListener("click", () => {
    if (!dotPressed) {
        dotPressed = true;
        display.textContent += ".";
    }
});

// Add logic for ops
["plus", "multiply", "minus", "divide"].forEach((op) => {
    const button = document.querySelector(`.${op}`);
    button.addEventListener("click", () => {
        numberStack.push(display.textContent);
        numberStack.push(op);
        startedNumber = false;
        dotPressed = false;
    });
});

// Equals
const equals_button = document.querySelector(".equals");
equals_button.addEventListener("click", () => {
    let r = display.textContent;
    let [op, l] = [numberStack.pop(), numberStack.pop()];
    console.log(r, op, l);
    res = opMap[op](Number(l), Number(r));
    display.textContent = res;
});

// All clear
const ac = document.querySelector(".ac");
ac.addEventListener("click", () => {
    res = 0;
    numberStack = [];
    startedNumber = false;
    dotPressed = false;
    display.textContent = res;
});
