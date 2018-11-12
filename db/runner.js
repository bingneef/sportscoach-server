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
} from '../models'

import { CalcStatsForMatch } from '../services/faktory/workers/stats';

const init = async () => {
  try {
    const player = await Player.findOne();
    const events = await player.events();
    const matches = await player.matches();
    const match = matches[0];

    await match.complete();
    const value = await match.duration()

  } catch (error) {
    console.log(error);
  }

  process.exit()
}

init()
