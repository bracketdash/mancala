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
function displayBoard(state) {
  // TODO
}
function updateBoard(player, pocket) {
  const currState = data[data.length - 1];
  const newState = [...currState];
  const chosenIndex = player === 1 ? pocket - 1 : 6 + pocket;
  let beads = currState[chosenIndex];
  newState[chosenIndex] = 0;
  let skipped = 0;
  Array(beads)
    .fill(1)
    .forEach((_, bead) => {
      const dataIndex = (chosenIndex + bead + skipped) % 14;
      if (
        (player === 1 && dataIndex === 13) ||
        (player === 2 && dataIndex === 6)
      ) {
        skipped++;
      } else {
        newState[dataIndex]++;
      }
    });
  if (skipped) {
    const ogTotes = currState[chosenIndex];
    Array(skipped)
      .fill(1)
      .forEach((_, skip) => {
        newState[(chosenIndex + skip + ogTotes) % 14]++;
      });
  }
  data.push(newState);
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
  if (confirm("Undo last move?")) {
    data.pop();
    setLocalData();
    displayBoard(data[data.length - 1]);
  }
});
document.getElementById("btn-reset").addEventListener("click", () => {
  if (confirm("Reset the board?")) {
    data = [[4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]];
    setLocalData();
    displayBoard(data[0]);
  }
});
