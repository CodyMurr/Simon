const board = [
  'green', 'red', 'yellow', 'blue'
];
let round = 0;
let on, playerSeq, computerSeq, playerTurn, lose;

const power = document.getElementById('toggle');
const counter = document.getElementById('counter');
const boardEls = [...document.querySelectorAll('#board > button')];

power.addEventListener("click", togglePower);

document.querySelector('#start').addEventListener("click", () => {
  if (!on) return;
  init();
});

function togglePower() {
  if (!on) {
    on = true;
    renderOn();
  } else {
    on = false;
    renderOff();
  }
}

function renderOn() {
  power.style.justifyContent = 'flex-end';
  counter.style.backgroundColor = '#940000';
  counter.style.color = '#ff1947';
}

function renderOff() {
  power.style.justifyContent = 'flex-start';
  counter.style.backgroundColor = '#3f3f3f';
  counter.innerHTML = '';
}

boardEls.forEach (btn => {
  btn.addEventListener("click", (e) => {
    if (!on || !playerTurn) return;
    const button = e.target;
    playerSeq.push(button.id);
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 250);
  });
  render();
});

function init() {
  playerSeq = [];
  computerSeq = [];
  round = 1;
  lose = false;
  getSequence();
  render();
}

function getSequence() {
  playerTurn = false;
  const randomColor = board[Math.floor(Math.random() * board.length)];
  computerSeq.push(randomColor);
  renderBoard();
  render();
}

function render() {
  counter.innerHTML = round;
}

function renderBoard() {
  computerSeq.forEach(color => {
    document.getElementById(color).classList.add('pressed');
    setTimeout(() => {
      document.getElementById(color).classList.remove('pressed');
    }, 250);
  });
  playerTurn = true;
}