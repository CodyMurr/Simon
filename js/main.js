const BASE_LIT_TIME = 1000;
const GAP_TIME = 500;
const MAX_ROUNDS = 10;
const LEVEL_JUMP = 4;
const LEVEL_DEC_TIME = 300;
const board = [
  {color:'green', sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")}, 
  {color: 'red', sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")},
  {color: 'yellow', sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")},
  {color: 'blue', sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")}
];

let LIT_TIME, compSeq, playerSeq, compTurn, intervalId, wrong, on, win;

const colors = [...document.querySelectorAll('#board button')];
const toggle = document.querySelector('#toggle');
const onBtn = document.querySelector('#toggle > #power');
const startBtn = document.querySelector('#start');

function lightOff() {
  colors[0].classList.remove('pressed');
  colors[1].classList.remove('pressed');
  colors[2].classList.remove('pressed');
  colors[3].classList.remove('pressed');
}

onBtn.addEventListener("click", (evt) => {
  if (onBtn.checked === true) {
    init();
    on = true;
    toggle.style.justifyContent = 'flex-end';
    counter.classList.add('on');
    counter.innerHTML = '-';
  } else {
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
  if (!on || compTurn || wrong) return;
  const targetIdx = colors.indexOf(e.target);
  if (targetIdx === -1) return;
  board[targetIdx].sound.play();
  playerSeq.push(targetIdx);
  colors[targetIdx].classList.add('pressed');
  setTimeout(() => {
    if (!wrong) colors[targetIdx].classList.remove('pressed');
  }, 250);
  if (checkSequence()) {
    getCompSeq();
  } else {
    checkMatch();
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
    color.classList.add('pressed');
    board[compSeq[index]].sound.play();
    setTimeout(() => {
      color.classList.remove('pressed');
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
  lightOff();
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

function checkSequence() {
  return JSON.stringify(playerSeq) === JSON.stringify(compSeq);
}

function checkMatch() {
  for (let i = 0; i < playerSeq.length; i++) {
    playerSeq[i] === compSeq[i] ? true : gameOver();
  }
}