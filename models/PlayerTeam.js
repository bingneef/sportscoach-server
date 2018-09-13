import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const PlayerTeamSchema = new Schema({
  playerId: {
    type: String,
    index: true,
    required: true,
  },
  teamId: {
    type: String,
    index: true,
    required: true,
  },
})

class PlayerTeamClass { }

PlayerTeamSchema.loadClass(PlayerTeamClass)

export const PlayerTeam = mongoose.model('PlayerTeam', PlayerTeamSchema)
