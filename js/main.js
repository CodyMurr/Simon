const game = {
  board: ['green', 'red', 'yellow', 'blue'],
  players: {
    '1': 'computer',
    '-1': 'user'
  },
}

/*----- app's state (variables) -----*/
let sequence;
let attemptSeq;
let playing;
let turn;
let round;

/*----- cached element references -----*/

const boardEls = [...document.querySelectorAll('.color')];
const start = document.getElementById('start');
const inPlayEls = document.getElementById('true');
const noPlayEls = document.getElementById('false');

/*----- event listeners -----*/
start.addEventListener("click", play);

boardEls.forEach(section => {
  section.addEventListener("click", handleClick);
});

/*----- functions -----*/

inPlayEls.style.display = 'none';
noPlayEls.style.display = 'inline-block';

function play() {
  sequence = [];
  attemptSeq = [];
  playing = true;
  turn = 1;
  round = 1;
  getSequence();
  render();
}

function getSequence() {
  const randomIdx = Math.floor(Math.random() * boardEls.length);
  const randomColor = game.board[randomIdx];
  sequence.push(randomColor);
  render(sequence);
}
 
function handleClick(e) {
  if (!playing || !turn) return;
  const secId = e.target.id;
  attemptSeq.push(secId);
  render(attemptSeq);
}

function render(arr) {
    inPlayEls.style.display = 'inline-block';
    noPlayEls.style.display = 'none';
    renderInfo();
    showSequence(arr);
}

function renderInfo() {
  document.getElementById(game.players[turn]).style.border = '.5em solid #aaa';
  document.getElementById('round').innerHTML = `${round} / 10`;
}

function showSequence(arr) {
  arr.forEach(item => {
    document.getElementById(`${item}`).style.backgroundColor = `${item}`;
      setTimeout(() => {
      document.getElementById(`${item}`).style.backgroundColor = '';
    }, 400);
    checkForWin()
  });
}