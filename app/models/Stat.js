import mongoose from 'app/services/database/mongodb'

const Schema = mongoose.Schema

export const StatSchema = new Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  kind: {
    type: String,
    enum: ['MATCH_GOALS', 'MATCH_DURATION', 'TEAM_GOALS', 'PLAYER_GOALS', 'PLAYER_ASSISTS', 'PLAYER_TIME_PLAYED'],
    index: true,
    required: true,
  },
  value: Number,
});

export const Stat = mongoose.model('Stat', StatSchema)
