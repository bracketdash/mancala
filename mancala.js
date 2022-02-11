const MAX_MOVES = 7;

function dribble(pockets, hand, index, points) {
  if (hand < 1) {
    if ((index === 12 || index < 6) && pockets[index - 1] === 1) {
      const opposite = index === 12 ? 11 : [11, 10, 9, 8, 7, 6][index - 1];
      let newPockets = [...pockets];
      points += newPockets[opposite] + 1;
      newPockets[index - 1] = 0;
      newPockets[opposite] = 0;
      return { newPockets, points };
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
  if (depth === MAX_MOVES) {
    // TODO: this (choices[choice].ends++) is in the wrong place, or needs to go in additional places
    choices[choice].ends++;
    if (tot.al >= 55986) {
      resolve(choices);
    }
    return;
  }
  tot.al++;
  choices.forEach((_, index) => {
    const cf = choice === false ? index : choice;
    if (pockets[index]) {
      const result = dribble(
        pockets,
        pockets[index + (flipped ? 6 : 0)],
        index + (flipped ? 6 : 0),
        0
      );
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
      tot.al += Math.pow(6, MAX_MOVES - depth);
    }
  });
}

function init() {
  const getArray = (length, fill) => new Array(length).fill(fill);
  return new Promise((resolve) => {
    recurse({
      choice: false,
      choices: getArray(6, 0).map(() => ({ ends: 0, points: 0 })),
      depth: 0,
      flipped: false,
      // TODO: allow user to input starting state
      pockets: getArray(12, 4),
      resolve,
      tot: { al: 0 },
    });
  }).then((result) => {
    console.log(result);
  });
}

init();
