let data = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
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
[...document.getElementsByClassName("little-pocket")].forEach((el, index) => {
  const player = index < 6 ? 2 : 1;
  const pocket = index < 6 ? 6 - index : index - 5;
  el.addEventListener("click", () => {
    console.log(player, pocket);
  });
});
