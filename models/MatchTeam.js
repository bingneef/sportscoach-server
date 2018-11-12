import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const MatchTeamSchema = new Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  kind: {
    type: String,
    enum: ['HOME', 'AWAY'],
    index: true,
  },
});

export const MatchTeam = mongoose.model('MatchTeam', MatchTeamSchema)
