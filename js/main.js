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
    color.addEventListener("mousedown", (e) => {
        e.target.style.backgroundColor = `radial-gradient(#fff, ${e.target.id})`;
    });
    color.addEventListener("mouseup", (e) => {
        e.target.style.backgroundColor = `${e.target.id}`;
    });
});

/*----- functions -----*/

function init() {
    board = [null, null, null, null];
    round = 1;
    turn = 1;
    pattern = [];
    winner = null;
    render();
};



function render() {
    reset.style.display = winner ? 'inline-block' : 'none';
}
