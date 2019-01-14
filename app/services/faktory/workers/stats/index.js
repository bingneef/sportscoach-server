import { calcMatchStats } from './match';
import { Match, Stat } from 'app/models';

export const options = {upsert: true, new: true, setDefaultsOnInsert: true};

const calcTeamStats = async ({match, events, teams}) => {
  const goals = events.filter(e => e.kind == 'GOAL');

  for (let team of teams) {
    await Stat.findOneAndUpdate({
      kind: 'TEAM_GOALS',
      matchId: match.id,
      teamId: team.id,
    },
    { value: goals.filter(g => g.teamId == team.id).length },
    options)
  }
}

const calcPlayerStats = async ({match, events, players}) => {
  const goals = events.filter(e => e.kind == 'GOAL');
  const assists = events.filter(e => e.kind == 'ASSIST');
  const timings = events.filter(e => e.kind.substring(0,7) == 'TIMING_')

  const { value: matchDuration } = await Stat.findOne({kind: 'MATCH_DURATION', matchId: match.id});

  for (let player of players) {
    const resp = await Stat.findOneAndUpdate({
      kind: 'PLAYER_GOALS',
      matchId: match.id,
      playerId: player.id,
    },
    { value: goals.filter(g => g.playerId == player.id).length },
    options)

    await Stat.findOneAndUpdate({
      kind: 'PLAYER_ASSISTS',
      matchId: match.id,
      playerId: player.id,
    },
    { value: assists.filter(g => g.playerId == player.id).length },
    options)

    const playerTimingKinds = ['STARTING_LINEUP', 'SUB_IN', 'SUB_OUT'];
    const playerDurationEvents = events.filter(e => e.playerId == player.id && ~playerTimingKinds.indexOf(e.kind))

    let duration = 0;
    if (playerDurationEvents.length > 0) {
      // FIXME
    }

    await Stat.findOneAndUpdate({
      kind: 'PLAYER_TIME_PLAYED',
      matchId: match.id,
      playerId: player.id,
    },
    { value: duration },
    options)
  }
}

export const CalcStatsForMatch = async matchId => {
  console.time('[WORKER] CalcStatsForMatch')
  console.log('[WORKER] Starting CalcStatsForMatch')

  // FIXME
  await Stat.remove();

  try {
    const match = await Match.findById(matchId);
    const teams = await match.teams();
    const players = await match.players();
    const events = await match.events();
    const goals = events.filter(e => e.kind == 'GOAL');
    const assists = events.filter(e => e.kind == 'ASSIST');

    await calcMatchStats({match, events});
    await calcTeamStats({match, events, teams});
    await calcPlayerStats({match, events, players});

  } catch (error) {
    console.error('[WORKER] CalcStatsForMatch', error)
  }

  console.timeEnd('[WORKER] CalcStatsForMatch')
}
