import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const StatSchema = new Schema({
  sport: {
    type: String,
    enum: ['TENNIS'],
    required: true,
  },
  type: {
    type: String,
    enum: ['SCORELINE'],
    required: true,
  },
  kind: {
    type: String,
    enum: ['SETS', 'GAMES', 'POINTS'],
    required: true,
  },
  matchId: {
    type: String,
    index: true,
    required: true,
  },
})

class StatClass { }

StatSchema.loadClass(StatClass)

export const Stat = mongoose.model('Stat', StatSchema)
