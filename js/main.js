const BASE_LIT_TIME = 1000;
const GAP_TIME = 500;
const MAX_ROUNDS = 10;
const LEVEL_JUMP = 4;
const LEVEL_DEC_TIME = 300;
const board = ['green', 'red', 'yellow', 'blue'];

let LIT_TIME;
let compSeq;
let playerSeq;
let compTurn;
let intervalId;
let wrong;
let on;
let win;

const colors = [...document.querySelectorAll('#board button')];
const toggle = document.querySelector('#toggle');
const onBtn = document.querySelector('#toggle > #power');
const startBtn = document.querySelector('#start');

onBtn.addEventListener("click", (evt) => {
  if (onBtn.checked === true) {
    console.log("powered on");
    init();
    on = true;
    toggle.style.justifyContent = 'flex-end';
    counter.classList.add('on');
    counter.innerHTML = '-';
  } else {
    console.log("powered off");
    on = false;
    toggle.style.justifyContent = 'flex-start';
    counter.classList.remove('on');
    counter.innerHTML = '';
  }
});

startBtn.addEventListener("click", (evt) => {
  if (on || win) play();
});

colors.forEach(color => {
  color.addEventListener("click", handlePlayerSeq);
});


function handlePlayerSeq(e) {
  if (!on || compTurn) return;
  const targetIdx = colors.indexOf(e.target);
  if (targetIdx === -1) return;
  // add audio
  playerSeq.push(targetIdx);
  colors[targetIdx].style.opacity = '100%';
  setTimeout(() => {
    if (!wrong) colors[targetIdx].style.opacity = '50%';
  }, 250);
  if (checkComplete()) {
    getCompSeq();
  } else {
    checkCurrent();
  }
}

function handleSequence() {
  LIT_TIME = BASE_LIT_TIME - Math.floor(compSeq.length / LEVEL_JUMP) * LEVEL_DEC_TIME;
  render();
}

function render() {
  let index = 0;
  intervalId = setInterval(() => {
    if (!on) {
      clearInterval(intervalId);
      return;
    }
    const color = colors[compSeq[index]];
    color.style.opacity = '100%';
    // add audio
    setTimeout(() => {
      color.style.opacity = '50%'
    }, LIT_TIME);
    index++;
    if (index >= compSeq.length) {
      clearInterval(intervalId);
      compTurn = false;
    }
  }, LIT_TIME + GAP_TIME);
}

function init() {
  compSeq = [];
  wrong = false;
  win = false;
}

function play() {
  getCompSeq();
}

function gameOver() {
  wrong = true;
  counter.innerHTML = '!!!'
}

function getCompSeq() {
  compTurn = true;
  playerSeq = [];
  compSeq.push(Math.floor(Math.random() * board.length));
  counter.innerHTML = compSeq.length;
  handleSequence();
}

function checkComplete() {
  return JSON.stringify(playerSeq) === JSON.stringify(compSeq);
}

function checkCurrent() {
  for (let i = 0; i < playerSeq.length; i++) {
    playerSeq[i] === compSeq[i] ? true : gameOver();
  }
}