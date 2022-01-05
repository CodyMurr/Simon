let on, playerSeq, computerSeq, round, lose;

const power = document.getElementById('toggle');
const counter = document.getElementById('counter');
const boardEls = document.querySelectorAll('#board > button');

power.addEventListener("click", () => {
  if (!on) {
    power.style.justifyContent = 'flex-end';
    counter.classList = 'on';
    on = true;
  } else {
    power.style.justifyContent = 'flex-start';
    counter.classList = 'off';
    counter.innerHTML = '';
    on = false;
  }
});

document.querySelector('#progress button').addEventListener("click", () => {
  if (!on) return;
  playerSeq = [];
  computerSeq = [];
  round = 1;
  lose = false;
  render();
});

function render() {
  counter.innerHTML = `${round}`;
  boardEls.forEach(btn => {
    btn.classList = 'pressed';
  });
}