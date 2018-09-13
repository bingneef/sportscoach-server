const initialObj = { home: 0, away: 0, };

export const calcTennisScore = ({match, pointEvents}) => {
  console.time('calculateScore');
  let sets = [initialObj];
  let games = [[initialObj]];
  let points = [[[initialObj]]];

  for (let pointEvent of pointEvents) {
    addTennisPoint({match, pointEvent, points, games, sets});
  }

  console.timeEnd('calculateScore');
  return {
    sets,
    games,
    points,
  }
}

export const addTennisPoint = ({match, pointEvent, points, games, sets}) => {
  // if (sets.length == 0) {
  //   sets = [initialObj];
  // }
  // if (games.length == 0) {
  //   games = [[initialObj]];
  // }
  // if (points.length == 0) {
  //   points = [[[initialObj]]];
  // }

  const setIndex = sets.length - 1;
  const gameIndex = games[setIndex].length - 1;
  const pointIndex = points[setIndex][gameIndex].length - 1;

  let activePoints = points[setIndex][gameIndex];
  let lastPoint = activePoints[pointIndex];

  const key = isHome({match, pointEvent}) ? 'home' : 'away';
  const nextPoint = {
    ...lastPoint,
    [key]: lastPoint[key] + 1,
  };

  activePoints.push(nextPoint);

  if (checkGameEnd(nextPoint)) {
    let lastGame = games[setIndex][gameIndex];

    const nextGame = {
      ...lastGame,
      [key]: lastGame[key] + 1,
    };

    games[setIndex].push(nextGame);

    if (checkSetEnd(nextGame)) {
      let lastSet = sets[setIndex];
      const nextSet = {
        ...lastSet,
        [key]: lastSet[key] + 1,
      };

      sets.push(nextSet);
      games.push([initialObj]);
      points.push([[initialObj]]);
    } else {
      points[setIndex].push([initialObj]);
    }
  }

  return {
    sets,
    games,
    points,
  }
}

const isHome = ({pointEvent, match}) => {
  return pointEvent.teamId == match.homeTeamId;
}

const checkGameEnd = lastPointScore => {
  const diff = Math.abs(lastPointScore.home - lastPointScore.away);
  const max = Math.max(lastPointScore.home, lastPointScore.away);
  return diff >= 2 && max >= 4;
}

const checkSetEnd = lastGameScore => {
  const diff = Math.abs(lastGameScore.home - lastGameScore.away);
  const max = Math.max(lastGameScore.home, lastGameScore.away);
  return diff >= 2 && max >= 6;
}

const checkMatchEnd = lastSetScore => {
  const max = Math.max(lastSetScore.home, lastSetScore.away);
  return max >= 1;
}
