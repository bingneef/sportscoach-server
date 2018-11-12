import uniq from 'lodash/uniq'

import mongoose from '../services/database/mongodb'
import { PlayerTeam, Player, MatchTeam, Match } from '.'

const Schema = mongoose.Schema

export const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

class TeamClass {
  async players(ctx) {
    const playerTeams = await ctx.dataLoaders.playerTeamsByTeamId.load(this._id);
    const playerIds = uniq(playerTeams.map(item => item.playerId));
    return Promise.all(playerIds.map(playerId => ctx.dataLoaders.playerById.load(playerId)));
  }

  async matches(ctx) {
    const matchTeams = await ctx.dataLoaders.matchTeamsByTeamId.load(this._id);
    const matchIds = uniq(matchTeams.map(item => item.matchId));
    return Promise.all(matchIds.map(matchId => ctx.dataLoaders.matchById.load(matchId)));
  }
}

TeamSchema.loadClass(TeamClass)

export const Team = mongoose.model('Team', TeamSchema)
