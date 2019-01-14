import mongoose from 'app/services/database/mongodb'

const Schema = mongoose.Schema

export const PlayerTeamSchema = new Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
});

export const PlayerTeam = mongoose.model('PlayerTeam', PlayerTeamSchema)
