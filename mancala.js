const MAX_MOVES = 7;

const getArray = (length, fill) => new Array(length).fill(fill);

function dribble(pockets, hand, index, points) {
  if (hand < 1) {
    if ((index === 12 || index < 6) && pockets[index - 1] === 1) {
      const newPockets = [...pockets];
      const opposite = index === 12 ? 11 : [11, 10, 9, 8, 7, 6][index - 1];
      points += newPockets[opposite] + 1;
      newPockets[index - 1] = 0;
      newPockets[opposite] = 0;
      return { pockets: newPockets, points };
    }
    return { pockets, points };
  }
  if (index === 6) {
    hand--;
    points++;
    if (hand === 1) {
      return { pockets, points, freeTurn: true };
    }
  } else if (index === 12) {
    index = 0;
  }
  let newPockets = [...pockets];
  newPockets[index]++;
  return dribble(newPockets, hand - 1, index + 1, points);
}

function recurse({ choice, choices, depth, flipped, pockets, resolve, tot }) {
  tot.al++;
  if (depth === MAX_MOVES) {
    choices[choice].ends++;
    if (tot.al >= 1306658) {
      setTimeout(() => {
        resolve(choices);
      }, 100);
    }
    return;
  }
  choices.forEach((_, index) => {
    const cf = choice === false ? index : choice;
    if (pockets[index]) {
      const newPockets = [...pockets];
      const startingPocket = index + (flipped ? 6 : 0);
      const hand = newPockets[startingPocket];
      newPockets[startingPocket] = 0;
      const result = dribble(newPockets, hand, startingPocket + 1, 0);
      if (!flipped) {
        choices[cf].points += result.points;
      }
      setTimeout(() => {
        recurse({
          choice: cf,
          choices,
          depth: depth + 1,
          flipped: result.freeTurn ? flipped : !flipped,
          pockets: result.pockets,
          resolve,
          tot,
        });
      });
    } else {
      choices[cf].ends++;
      tot.al += Math.pow(6, MAX_MOVES - depth);
      if (tot.al >= 1306658) {
        resolve(choices);
      }
    }
  });
}

function getBestMoves(pockets) {
  return new Promise((resolve) => {
    recurse({
      choice: false,
      choices: getArray(6, 0).map(() => ({ ends: 0, points: 0 })),
      depth: 0,
      flipped: false,
      pockets,
      resolve,
      tot: { al: 0 },
    });
  }).then((result) => {
    console.log(
      result
        .map((result, index) => {
          return { pocket: index + 1, average: result.points / result.ends };
        })
        .sort((a, b) =>
          a.average > b.average ? -1 : a.average < b.average ? 1 : 0
        )
    );
  });
}

getBestMoves([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
