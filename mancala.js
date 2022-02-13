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
    points++;
    hand--;
    if (!hand) {
      return { pockets, points, freeTurn: true };
    }
  } else if (index === 12) {
    index = 0;
  }
  let newPockets = [...pockets];
  newPockets[index]++;
  return dribble(newPockets, hand - 1, index + 1, points);
}

function getScores(pockets) {
  const points = [4, 5, 6, 7, 8, 9];
  pockets.slice(0, 6).forEach((pocket, index) => {
    const oPoints = [0, 0, 0, 0, 0, 0];
    const newPockets = [...pockets];
    newPockets[index] = 0;
    const result = dribble(newPockets, pocket, index + 1, 0);
    points[index] += result.points;
    if (result.freeTurn) {
      points[index] += 1 + Math.max(...getScores(result.pockets));
    }
    result.pockets.slice(6, 12).forEach((oPocket, oIndex) => {
      const oResult = dribble(result.pockets, oPocket, oIndex, 0);
      oPoints[oIndex] += oResult.points;
      if (oResult.freeTurn) {
        oPoints[oIndex] += 5;
      }
    });
    points[index] -= Math.max(...oPoints);
  });
  return points;
}

function init() {
  const scores = getScores([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4])
    .map((score, index) => {
      return { slot: index + 1, score };
    })
    .sort((a, b) => (a.score < b.score ? 1 : a.score > b.score ? -1 : 0));
  console.log(scores[0].slot);
}

init();
