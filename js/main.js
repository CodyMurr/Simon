const players = {
  '1': 'com',
  '-1': 'player'
};

const board = [
  {color: 'green'}, {color: 'red'}, 
  {color: 'yellow'}, {color: 'blue'}
];

const finalRound = 10;
const sequence = [];

/*----- app's state (variables) -----*/

let round, turn, winner;

/*----- cached element references -----*/

const boardEls = [...document.querySelectorAll('#board div')];
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const currentRound = document.getElementById('round');

/*----- event listeners -----*/
start.addEventListener("click", play);
reset.addEventListener("click", play);
boardEls.forEach(section => {
  section.addEventListener("click", handleAttempt);
});

/*----- functions -----*/

function play() {
  round = 1;
  turn = 1;
  winner = false;
  getSequence(sequence);
  render();
}

function getSequence(arr) {
  while (arr.length < round) {
    const randomIdx = Math.floor(Math.random() * boardEls.length);
    const randomColor = board[randomIdx].color;
    arr.push(randomColor);
  } 
  render();
  renderColors(arr);
}

function handleAttempt(e) {
  if (turn > 0 || winner) return;
  const playerSeq = [];
  const idx = boardEls.indexOf(e.target);
  const color = board[idx].color;
  playerSeq.push(color);
  winner = checkSequence(playerSeq);
  render();
  renderColors(playerSeq);
}

function render() {
  start.style.display = 'none';
  reset.style.display = winner ? 'inline-block' : 'none';
  document.getElementById('players').style.display = 'inline-block';
  document.getElementById(players[turn]).style.border = '#aaa';
  currentRound.innerHTML = `${round} / ${finalRound}`;
  
}

function renderColors(arr) {
  let index = 0;
  const color = document.getElementById(arr[index]);
  color.style.backgroundColor = arr[index];
  setTimeout(() => {
    color.style.backgroundColor = '';
  }, 400);  
  const colorSequence =
    setInterval(() => {
      index+=1;
      if (index <= arr.length) {
        clearInterval(colorSequence);
      }
  }, 500);
  turn *= -1;
}


function checkSequence(arr) {
  for(let i = 0; i < round; i++) {
    if (arr[i] === sequence[i]) {
      checkWin();
    }
  }
}
function checkWin() {
  if (round === finalRound) {
    winner = players['-1'];
  } else {
    round += 1;
    getSequence(sequence); 
  }
}