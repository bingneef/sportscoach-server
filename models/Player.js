import mongoose from '../services/database/mongodb'
import crypto from 'crypto'

const Schema = mongoose.Schema

export const PlayerSchema = new Schema(
  {
    userId: {
      type: String,
      index: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

class PlayerClass { }

PlayerSchema.loadClass(PlayerClass)

export const Player = mongoose.model('Player', PlayerSchema)
