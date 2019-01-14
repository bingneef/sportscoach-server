import { options } from '.'
import { durationFromTimings } from './timings';
import { Stat } from 'app/models';

export const kindStats = ({ events, match, kind, tag }) => {
  const items = events.filter(e => e.kind == kind);
  return saveStat({kind: tag, matchId: match.id, value: items.length});
}

export const durationStats = async ({ events, match}) => {
  const timings = events.filter(e => e.kind.substring(0,7) == 'TIMING_')
  const gameDuration = await durationFromTimings({timings});
  return saveStat({kind: 'MATCH_DURATION', matchId: match.id, value: gameDuration});
}

export const calcMatchStats = async ({match, events}) => {
  await kindStats({match, events, kind: 'GOAL', tag: 'MATCH_GOALS'})
  await kindStats({match, events, kind: 'ASSIST', tag: 'MATCH_ASSISTS'})
  await durationStats({match, events})
}

const saveStat = ({kind, matchId, value}) => {
  return Stat.findOneAndUpdate({
    kind,
    matchId,
  },{ value }, options)
}
