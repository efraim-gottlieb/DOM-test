const elDiceOne = document.getElementById("dice1");
const elDiceTwo = document.getElementById("dice2");
const elComeOut = document.getElementById("roll");
const players = document.querySelector(".players");
let curPlayer;
let goalScore = Math.floor(Math.random() * (50 - 50 + 1) + 50);
const goal = document.querySelector(".goal");
goal.textContent = `Score: ${goalScore}`;
const scoreStack = {
  "Player 1": 0,
  "Player 2": 0,
};
initRandomPlayer();
const dict = {};
function initRandomPlayer() {
  curPlayer =
    Object.keys(scoreStack)[Math.floor(Math.random() * (2 - 0 + 0) + 0)];
}

diaplayPlayers();
function changePlayer() {
  if (curPlayer == Object.keys(scoreStack)[0]) {
    curPlayer = Object.keys(scoreStack)[1];
  } else {
    curPlayer = Object.keys(scoreStack)[0];
  }
}
elComeOut.onclick = function () {
  rollDice();
};

function rollDice() {
  const diceOne = Math.floor(Math.random() * 6 + 1);
  const diceTwo = Math.floor(Math.random() * 6 + 1);
  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove("show-" + i);
    if (diceOne === i) {
      elDiceOne.classList.add("show-" + i);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceTwo.classList.remove("show-" + k);
    if (diceTwo === k) {
      elDiceTwo.classList.add("show-" + k);
    }
  }
  const a = elDiceOne.classList[elDiceOne.classList.length - 1];
  const b = elDiceTwo.classList[elDiceTwo.classList.length - 1];
  if (a == b) {
    scoreStack[curPlayer] = 0;
    console.log(curPlayer);
    changePlayer();
  } else {
    scoreStack[curPlayer] += +a.at(-1) + +b.at(-1);
  }
  diaplayPlayers();
  if (scoreStack[curPlayer] >= goalScore) {
    document.body.innerHTML = "";
    const won = document.createElement("div");
    won.className = "won";
    won.textContent = `${curPlayer} won !!!`;
    document.body.append(won);
  }
}

function diaplayPlayers() {
  players.innerHTML = "";
  for (const [player, score] of Object.entries(scoreStack)) {
    const playerDiv = document.createElement("div");
    playerDiv.innerHTML = player;
    playerDiv.id = player;
    playerDiv.classList.add("player");
    if (curPlayer == player) playerDiv.classList.add("cur-player");
    const scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = score;
    playerDiv.append(scoreDiv);
    players.append(playerDiv);
  }
}

const control = document.querySelector(".game");
const passButton = document.createElement("button");
passButton.id = "pass";
passButton.textContent = "Pass";
control.append(passButton);

pass.addEventListener("click", () => {
  changePlayer();
  diaplayPlayers();
});
