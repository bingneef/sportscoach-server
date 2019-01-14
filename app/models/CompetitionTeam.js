import mongoose from 'app/services/database/mongodb'

const Schema = mongoose.Schema

export const CompetitionTeamSchema = new Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
});

export const CompetitionTeam = mongoose.model('CompetitionTeam', CompetitionTeamSchema)
