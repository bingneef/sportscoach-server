import '../init';

import {
  Competition,
  CompetitionTeam,
  Event,
  Token,
  Match,
  MatchTeam,
  Player,
  PlayerTeam,
  PlayerUser,
  Season,
  Stat,
  Team,
  TeamUser,
  User,
} from 'app/models'

const clearDatabase = async () => {
  await Competition.remove();
  await CompetitionTeam.remove();
  await Event.remove();
  await Token.remove();
  await Match.remove();
  await MatchTeam.remove();
  await Player.remove();
  await PlayerTeam.remove();
  await PlayerUser.remove();
  await Season.remove();
  await Stat.remove();
  await Team.remove();
  await TeamUser.remove();
  await User.remove()
}

const init = async () => {
  try {
    await clearDatabase()

    const user = await new User({
      firstName: 'Bing',
      lastName: 'Steup',
      email: 'bingsteup@gmail.com',
      password: 'testtest',
    }).save()

    const season = await new Season({
      startAt: '2018-09-01',
      endAt: '2019-08-31',
    }).save()

    const competition = await new Competition({
      kind: 'LEAGUE',
    }).save()

    const team_1 = await new Team({
      name: 'Ariston',
    }).save()

    const ct_1 = await new CompetitionTeam({
      competitionId: competition.id,
      teamId: team_1.id,
    }).save()

    const player_1_1 = await new Player({
      firstName: 'Bing',
    }).save()

    const player_1_2 = await new Player({
      firstName: 'Boukie',
    }).save()

    const player_1_3 = await new Player({
      firstName: 'J3',
    }).save()

    await new PlayerTeam({
      teamId: team_1.id,
      playerId: player_1_1.id,
    }).save()

    await new PlayerTeam({
      teamId: team_1.id,
      playerId: player_1_2.id,
    }).save()

    await new PlayerTeam({
      teamId: team_1.id,
      playerId: player_1_3.id,
    }).save()

    await new PlayerUser({
      playerId: player_1_1.id,
      userId: user.id,
      role: 'OWNER',
    }).save()

    const team_2 = await new Team({
      name: 'VVNoordwijk',
    }).save()

    const ct_2 = await new CompetitionTeam({
      competitionId: competition.id,
      teamId: team_2.id,
    }).save()

    const match = await new Match({
      competitionId: competition.id,
      status: 'PROGRESS',
      competition: competition.id,
    }).save()

    const mt_1 = await new MatchTeam({
      matchId: match.id,
      teamId: team_1.id,
      kind: 'HOME',
    }).save()

    const mt_2 = await new MatchTeam({
      matchId: match.id,
      teamId: team_2.id,
      kind: 'AWAY',
    }).save()

    await new Event({
      matchId: match.id,
      teamId: team_1.id,
      kind: 'STARTING_LINEUP',
      playerId: player_1_1.id,
    }).save()

    await new Event({
      matchId: match.id,
      teamId: team_1.id,
      kind: 'STARTING_LINEUP',
      playerId: player_1_3.id,
    }).save()

    const tps_1 = await new Event({
      matchId: match.id,
      kind: 'TIMING_PERIOD_START',
      value: 0,
      createdAt: new Date(2018,1,1,14,30),
    }).save()

    await new Event({
      matchId: match.id,
      kind: 'TIMING_PERIOD_END',
      parentId: tps_1.id,
      value: 0,
      createdAt: new Date(2018,1,1,15,16),
    }).save()

    const tps_2 = await new Event({
      matchId: match.id,
      kind: 'TIMING_PERIOD_START',
      value: 1,
      createdAt: new Date(2018,1,1,15,30),
    }).save()

    const subOut = await new Event({
      matchId: match.id,
      playerId: player_1_1.id,
      teamId: team_1.id,
      kind: 'SUB_OUT',
      createdAt: new Date(2018,1,1,15,32),
    }).save()

    await new Event({
      matchId: match.id,
      playerId: player_1_2.id,
      teamId: team_1.id,
      parentId: subOut.id,
      kind: 'SUB_IN',
      createdAt: new Date(2018,1,1,15,32),
    }).save()

    const tp_1 = await new Event({
      matchId: match.id,
      kind: 'TIMING_PAUSED',
      value: 1,
      createdAt: new Date(2018,1,1,15,45),
    }).save()

    await new Event({
      matchId: match.id,
      kind: 'TIMING_RESUMED',
      parentId: tp_1.id,
      value: 1,
      createdAt: new Date(2018,1,1,15,47,30),
    }).save()

    await new Event({
      matchId: match.id,
      kind: 'TIMING_PERIOD_END',
      parentId: tps_2.id,
      value: 1,
      createdAt: new Date(2018,1,1,16,20),
    }).save()

    const event_1 = await new Event({
      matchId: match.id,
      teamId: team_2.id,
      kind: 'GOAL',
      playerId: player_1_1.id,
    }).save()

    await new Event({
      matchId: match.id,
      teamId: team_2.id,
      parentID: event_1.id,
      kind: 'ASSIST',
    }).save()

  } catch (e) {
    console.error(e)
  }

  process.exit()
}

init()
