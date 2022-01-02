/*----- constants -----*/
const players = {
    1: 'computer',
    '-1': 'user'
}

/*----- app's state (variables) -----*/
let board;
let round;
let turn;
let pattern;
let winner

/*----- cached element references -----*/
const boardEls = [...document.querySelectorAll('#board > div')];
const start = document.getElementById('start');
const currentRd = document.getElementById('round');
const reset = document.getElementById('reset');
/*----- event listeners -----*/
start.addEventListener("click", init);

boardEls.forEach(color => {
    color.addEventListener("click", handleClick);
});

/*----- functions -----*/

function init() {
    board = [
        'green', 'red',
        'yellow', 'blue'
    ]
    round = 1;
    turn = 1;
    pattern = [];
    winner = null;
    render();
};

function handleClick(e) {
    const idx = boardEls.indexOf(e.target);
    const color = board[idx];
    e.target.style.backgroundColor = `${color}`;
    setTimeout(() => {
        e.target.style.backgroundColor = '#fff';
    }, 200);
}

function render() {
    reset.style.display = winner ? 'inline-block' : 'none';
    start.style.display = 'none';
    currentRd.style.display = 'inline-block';
}