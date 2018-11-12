import uniq from 'lodash/uniq'

import mongoose from '../services/database/mongodb'
import { CompetitionTeam, Team, Match } from '.'

const Schema = mongoose.Schema

export const CompetitionSchema = new Schema({
  kind: {
    type: String,
    enum: ['LEAGUE', 'FRIENDLY', 'TOURNAMENT'],
    index: true,
    required: true,
  },
});

class CompetitionClass {
  async teams () {
    const competitionTeams = await CompetitionTeam.find({competitionId: this.id})
    const teamIds = uniq(competitionTeams.map(item => item.teamId));
    return Team.find({_id: teamIds});
  }

  async matches () {
    return Match.find({competitionId: this.id})
  }
}

CompetitionSchema.loadClass(CompetitionClass)

export const Competition = mongoose.model('Competition', CompetitionSchema)
