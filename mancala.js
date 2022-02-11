const MAX_MOVES = 7;

function dribble(pockets, hand, index, points) {
  if (!hand) {
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

function recurse({ choice, choices, depth, flipped, pockets, resolve }) {
  const cf = choice === false ? index : choice;
  if (depth === MAX_MOVES) {
    choices[cf].ends++;
    // TODO: when all processing is done, resolve(choices);
    return;
  }
  choices.forEach((_, index) => {
    if (pockets[index]) {
      const result = dribble(
        pockets,
        pockets[index + (flipped ? 6 : 0)],
        index + (flipped ? 6 : 0),
        0
      );
      if (!flipped) {
        choices[cf] += result.points;
      }
      setTimeout(() => {
        recurse({
          choice: choice === false ? index : choice,
          choices,
          depth: depth + 1,
          flipped: result.freeTurn ? flipped : !flipped,
          pockets: result.pockets,
          resolve,
        });
      });
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
    });
  }).then((result) => {
    console.log(result);
  });
}

init();
