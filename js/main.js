const game = {
  board: ['green', 'red', 'yellow', 'blue'],
  players: {
    '1': {
      name: 'computer',
      sequence: []
    },
    '-1': {
      name: 'user',
      sequence: []
    }
  }
}

/*----- app's state (variables) -----*/

let playing;
let turn;
let round;

/*----- cached element references -----*/

const boardEls = [...document.querySelectorAll('#board div')];
const start = document.getElementById('start');
const inPlayEls = document.getElementById('true');
const noPlayEls = document.getElementById('false');

/*----- event listeners -----*/
start.addEventListener("click", play);

boardEls.forEach(section => {
  section.addEventListener("click", (e) => {
    const idx = boardEls.indexOf(e.target);
    const id = game.board[idx];
    game.players['-1'].sequence.push(id);
    render();
  });
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
  setTimeout(getSequence, 2000);
  render();
}

function getSequence() {
  const randomIdx = Math.floor(Math.random() * boardEls.length);
  const randomColor = game.board[randomIdx];
  game.players['1'].sequence.push(randomColor);
  render();
}

function render(arr) {
    inPlayEls.style.display = 'inline-block';
    noPlayEls.style.display = 'none';
    renderInfo();
    showSequence();
}

function renderInfo() {

  document.getElementById(game.players[turn].name).style.border = '.25em solid #aaa';
  document.getElementById('round').innerHTML = `${round} / 10`;
}

function showSequence() {
  game.players[turn].sequence.forEach(item => {
    document.getElementById(`${item}`).style.backgroundColor = `${item}`;
      setTimeout(() => {
      document.getElementById(`${item}`).style.backgroundColor = '';
    }, 400);
    turn *= -1;
  });
}