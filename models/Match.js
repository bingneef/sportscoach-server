import uniq from 'lodash/uniq'

import mongoose from '../services/database/mongodb'
import { runBackgroundJob } from '../services/faktory';
import { Event, Team, MatchTeam, Player, Stat, Competition } from '.'

const Schema = mongoose.Schema

export const MatchSchema = new Schema({
  status: {
    type: String,
    enum: ['PLANNED', 'PROGRESS', 'COMPLETED'],
    index: true,
    required: true,
  },
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition'
  },
});

class MatchClass {
  async calcStats() {
    await runBackgroundJob({jobtype: 'CalcStatsForMatch', args: [this.id]})
    return true;
  }

  async complete() {
    if (this.status == 'COMPLETED') {
      return false
    }

    await runBackgroundJob({jobtype: 'CalcStatsForMatch', args: [this.id]})
    return this.save({status: 'COMPLETED'})
  }

  async score() {
    return Stat.find({matchId: this.id, kind: 'TEAM_GOALS'});
  }

  async duration () {
    const stat = await Stat.findOne({matchId: this.id, kind: 'MATCH_DURATION'});
    const { value = 0 } = stat || {};
    return value
  }

  async competition () {
    return Competition.findOne({_id: this.competitionId})
  }

  async stats (args = {}, select = null) {
    let query = Stat.where({matchId: this.id, teamId: null, playerId: null, ...args});
    if (select) { query = query.select(select) }

    return query
  }

  async events (args = {}, select = null) {
    let query = Event.where({...args, matchId: this.id});
    if (select) { query = query.select(select) }
    return query
  }

  async teams () {
    const matchTeams = await MatchTeam.find({matchId: this.id}).select('teamId');
    const teamIds = uniq(matchTeams.map(item => item.teamId));
    return Team.find({_id: teamIds});
  }

  async players (args = {}) {
    const events = await this.events({ ...args, kind: ['STARTING_LINEUP', 'SUB_IN']}, 'playerId');
    const playerIds = uniq(events.map(item => item.playerId));
    return Player.find({_id: playerIds});
  }
}

MatchSchema.loadClass(MatchClass)

export const Match = mongoose.model('Match', MatchSchema)
