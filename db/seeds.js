import {
  User,
  Player,
  Match,
  MatchPlayer,
  Event,
  Team,
  PlayerTeam,
} from '../models'

const clearDatabase = async () => {
  await User.remove()
  await Player.remove()
  await Match.remove()
  await MatchPlayer.remove()
  await Event.remove()
  await Team.remove()
  await PlayerTeam.remove()
}

const init = async () => {
  try {
    await clearDatabase()

    const user = await new User({
      name: 'Bing Steup',
      token: 'testtest',
      externalId: 'oARkuNOuhwM3mUke0qQFtzu3XhC2',
    }).save()

    const player = await new Player({
      userId: user.id,
    }).save()

    const team = await new Team({
      name: 'Home',
    }).save()

    const team_2 = await new Team({
      name: 'Away',
    }).save()

    const playerTeam = await new PlayerTeam({
      playerId: player.id,
      teamId: team.id,
    }).save()

    const match = await new Match({
      homeTeamId: team.id,
      awayTeamId: team_2.id,
      score: {
        setScores: [{home: 0, away: 0}],
        setScore: {home: 0, away: 0},
        lastGameScore: {home: 0, away: 0},
      },
    }).save()

    const matchPlayer = await new MatchPlayer({
      matchId: match.id,
      playerId: player.id,
    }).save()

    let promises = [];
    for (let i = 0; i < 500; i++) {
      let teamId = Math.random() >= 0.5 ? team.id : team_2.id;
      promises.push(new Event({
        kind: 'POINT',
        teamId,
        matchId: match.id,
      }).save());
    }
    await Promise.all(promises);

    await match.calculateScore();

  } catch (e) {
    console.error(e)
  }

  process.exit()
}

init()
