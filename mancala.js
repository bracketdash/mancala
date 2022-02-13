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
  const points = [10, 10, 10, 10, 10, 10];
  pockets.slice(0, 6).forEach((pocket, index) => {
    const oPoints = [0, 0, 0, 0, 0, 0];
    const newPockets = [...pockets];
    newPockets[index] = 0;
    const result = dribble(newPockets, pocket, index + 1, 0);
    // TODO: make freeTurn worth 1 + the highest points of next round (recursively)
    points[index] += result.points + (result.freeTurn ? 8 : 0);
    result.pockets.slice(6, 12).forEach((oPocket, oIndex) => {
      const oResult = dribble(result.pockets, oPocket, oIndex, 0);
      // TODO: make freeTurn worth 1 + the highest points of next round (recursively)
      oPoints[oIndex] += oResult.points + (oResult.freeTurn ? 8 : 0);
    });
    points[index] -= Math.max(...oPoints);
    // TODO: avoid having all empty slots
    console.log(index, result.pockets.join(","), points[index]);
  });
}

getScores([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]);
