import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const MatchPlayerSchema = new Schema({
  matchId: {
    type: String,
    index: true,
    required: true,
  },
  playerId: {
    type: String,
    index: true,
    required: true,
  },
})

class MatchPlayerClass { }

MatchPlayerSchema.loadClass(MatchPlayerClass)

export const MatchPlayer = mongoose.model('MatchPlayer', MatchPlayerSchema)
