const board = [
  'green', 'red', 'yellow', 'blue'
];
let round = 0;
let on, computerSeq, playerTurn, lose;

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
  btn.addEventListener("click", checkSequence);
});

function init() {
  computerSeq = [];
  round = 1;
  lose = false;
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
  getSequence();
}

function renderBoard() {
  computerSeq.forEach(color => {
    document.getElementById(color).classList.add('pressed');
    setTimeout(() => {
      document.getElementById(color).classList.remove('pressed');
    }, 250);
  });
  playerTurn = true;
  checkSequence(e);
}

function checkSequence(e) {
  for (let i = 0; i < computerSeq.length; i++) {
    if (!on || !playerTurn) return;
    const button = e.target;
    button.classList.add('pressed');
    setTimeout(() => {
      button.classList.remove('pressed');
    }, 250);
    if (button.id === computerSeq[i]) {
      round++;
      render();
    }
  }
}