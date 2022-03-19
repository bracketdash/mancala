import { useState } from "react";

export default function Game() {
  // let data = [[4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]];
  // function setLocalData() {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }
  // if (localStorage.getItem("data")) {
  //   try {
  //     data = JSON.parse(localStorage.getItem("data"));
  //     displayBoard(data[data.length - 1]);
  //   } catch (e) {
  //     setLocalData();
  //   }
  // } else {
  //   setLocalData();
  // }
  // function displayBoard(state) {
  //   state.forEach((value, index) => {
  //     const player = index < 6 ? 1 : 2;
  //     const pocket = index < 6 ? index + 1 : index - 6;
  //     if (index === 6) {
  //       document.getElementById("p1bp-usd").innerHTML = value;
  //       document.getElementById("p1bp-rsu").innerHTML = value;
  //     } else if (index === 13) {
  //       document.getElementById("p2bp-usd").innerHTML = value;
  //       document.getElementById("p2bp-rsu").innerHTML = value;
  //     } else {
  //       document.getElementById(`p${player}lp${pocket}-usd`).innerHTML = value;
  //       document.getElementById(`p${player}lp${pocket}-rsu`).innerHTML = value;
  //     }
  //   });
  // }
  // function dribble(player, state, index, beads) {
  //   if (!beads) {
  //     return state;
  //   }
  //   if (index === 14) {
  //     index = 0;
  //   }
  //   if (beads === 1 && state[index] === 0) {
  //     if (player === 1 && index < 6) {
  //       const opposite = 6 - index + 6;
  //       state[6] += 1 + state[opposite];
  //       state[opposite] = 0;
  //       return state;
  //     } else if (player === 2 && index > 6 && index !== 13) {
  //       const opposite = 6 - (index - 6);
  //       state[13] += 1 + state[opposite];
  //       state[opposite] = 0;
  //       return state;
  //     }
  //   }
  //   if ((player === 1 && index === 13) || (player === 2 && index === 6)) {
  //     return dribble(player, state, index + 1, beads);
  //   } else {
  //     state[index]++;
  //     return dribble(player, state, index + 1, beads - 1);
  //   }
  // }
  // function updateBoard(player, pocket) {
  //   const currState = data[data.length - 1];
  //   const chosenIndex = player === 1 ? pocket - 1 : 6 + pocket;
  //   const newState = [...currState];
  //   newState[chosenIndex] = 0;
  //   data.push(
  //     dribble(player, newState, chosenIndex + 1, currState[chosenIndex])
  //   );
  //   setLocalData();
  //   displayBoard(newState);
  // }
  // [...document.getElementsByClassName("little-pocket")].forEach((el, index) => {
  //   const player = index < 6 ? 2 : 1;
  //   const pocket = index < 6 ? 6 - index : index - 5;
  //   el.addEventListener("click", () => {
  //     updateBoard(player, pocket);
  //   });
  // });
  // document.getElementById("btn-undo").addEventListener("click", () => {
  //   if (data.length === 1) {
  //     return;
  //   }
  //   data.pop();
  //   setLocalData();
  //   displayBoard(data[data.length - 1]);
  // });
  // document.getElementById("btn-reset").addEventListener("click", () => {
  //   if (confirm("Reset the board?")) {
  //     data = [[4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]];
  //     setLocalData();
  //     displayBoard(data[0]);
  //   }
  // });

  // the template
  return (
    <div className="container">
      <div class="board">
        <div class="big-pocket">
          <div class="usd" id="p2bp-usd">
            0
          </div>
          <div class="rsu" id="p2bp-rsu">
            0
          </div>
        </div>
        <div class="little-pockets">
          <div class="little-pocket">
            <div class="usd" id="p2lp6-usd">
              4
            </div>
            <div class="rsu" id="p2lp6-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p2lp5-usd">
              4
            </div>
            <div class="rsu" id="p2lp5-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p2lp4-usd">
              4
            </div>
            <div class="rsu" id="p2lp4-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p2lp3-usd">
              4
            </div>
            <div class="rsu" id="p2lp3-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p2lp2-usd">
              4
            </div>
            <div class="rsu" id="p2lp2-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p2lp1-usd">
              4
            </div>
            <div class="rsu" id="p2lp1-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p1lp1-usd">
              4
            </div>
            <div class="rsu" id="p1lp1-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p1lp2-usd">
              4
            </div>
            <div class="rsu" id="p1lp2-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p1lp3-usd">
              4
            </div>
            <div class="rsu" id="p1lp3-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p1lp4-usd">
              4
            </div>
            <div class="rsu" id="p1lp4-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p1lp5-usd">
              4
            </div>
            <div class="rsu" id="p1lp5-rsu">
              4
            </div>
          </div>
          <div class="little-pocket">
            <div class="usd" id="p1lp6-usd">
              4
            </div>
            <div class="rsu" id="p1lp6-rsu">
              4
            </div>
          </div>
        </div>
        <div class="big-pocket">
          <div class="usd" id="p1bp-usd">
            0
          </div>
          <div class="rsu" id="p1bp-rsu">
            0
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="button" id="btn-undo">
          Undo Move
        </div>
        <div class="button" id="btn-reset">
          Reset Board
        </div>
      </div>
    </div>
  );
}
