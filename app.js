let data = [[4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]];
function setLocalData() {
  localStorage.setItem("data", JSON.stringify(data));
}
if (localStorage.getItem("data")) {
  try {
    data = JSON.parse(localStorage.getItem("data"));
  } catch (e) {
    setLocalData();
  }
} else {
  setLocalData();
}
function updateBoard(player, pocket) {
  console.log(player, pocket);
  const currState = data[data.length - 1];
  const newState = [...currState];
  const chosenIndex = player === 1 ? pocket - 1 : 6 + pocket;
  let beads = currState[chosenIndex];
  newState[chosenIndex] = 0;
  // TODO
  // data.push( new state );
}
[...document.getElementsByClassName("little-pocket")].forEach((el, index) => {
  const player = index < 6 ? 2 : 1;
  const pocket = index < 6 ? 6 - index : index - 5;
  el.addEventListener("click", () => {
    updateBoard(player, pocket);
  });
});
document.getElementById("btn-undo").addEventListener("click", () => {
  if (confirm("Undo last move?")) {
    console.log("TODO: Undo last move.");
  }
});
document.getElementById("btn-reset").addEventListener("click", () => {
  if (confirm("Reset the board?")) {
    console.log("TODO: Reset the board.");
  }
});
