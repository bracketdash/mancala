let data = [[4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]];
function setLocalData() {
  localStorage.setItem("data", JSON.stringify(data));
}
if (localStorage.getItem("data")) {
  try {
    data = JSON.parse(localStorage.getItem("data"));
    displayBoard(data[data.length - 1]);
  } catch (e) {
    setLocalData();
  }
} else {
  setLocalData();
}
function displayBoard(state) {
  state.forEach((value, index) => {
    const player = index < 6 ? 1 : 2;
    const pocket = index < 6 ? index + 1 : index - 6;
    if (index === 6) {
      document.getElementById("p1bp-usd").innerHTML = value;
      document.getElementById("p1bp-rsu").innerHTML = value;
    } else if (index === 13) {
      document.getElementById("p2bp-usd").innerHTML = value;
      document.getElementById("p2bp-rsu").innerHTML = value;
    } else {
      document.getElementById(`p${player}lp${pocket}-usd`).innerHTML = value;
      document.getElementById(`p${player}lp${pocket}-rsu`).innerHTML = value;
    }
  });
}
function dribble(player, state, index, beads) {
  if (!beads) {
    return state;
  }
  if (beads === 1) {
    // TODO: if last bead would go in an empty pocket on player's side
    // take that bead and any in the pocket on the opposite side and put it in player's big pockets
  }
  if (index === 14) {
    index = 0;
  }
  if ((player === 1 && index === 13) || (player === 2 && index === 6)) {
    return dribble(player, state, index + 1, beads);
  } else {
    state[index]++;
    return dribble(player, state, index + 1, beads - 1);
  }
}
function updateBoard(player, pocket) {
  const currState = data[data.length - 1];
  const chosenIndex = player === 1 ? pocket - 1 : 6 + pocket;
  const newState = [...currState];
  newState[chosenIndex] = 0;
  data.push(dribble(player, newState, chosenIndex + 1, currState[chosenIndex]));
  setLocalData();
  displayBoard(newState);
}
[...document.getElementsByClassName("little-pocket")].forEach((el, index) => {
  const player = index < 6 ? 2 : 1;
  const pocket = index < 6 ? 6 - index : index - 5;
  el.addEventListener("click", () => {
    updateBoard(player, pocket);
  });
});
document.getElementById("btn-undo").addEventListener("click", () => {
  if (data.length === 1) {
    return;
  }
  data.pop();
  setLocalData();
  displayBoard(data[data.length - 1]);
});
document.getElementById("btn-reset").addEventListener("click", () => {
  if (confirm("Reset the board?")) {
    data = [[4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]];
    setLocalData();
    displayBoard(data[0]);
  }
});
