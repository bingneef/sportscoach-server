import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const PlayerUserSchema = new Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: String,
    enum: ['OWNER', 'FOLLOWER'],
    index: true,
    required: true,
  },
});

export const PlayerUser = mongoose.model('PlayerUser', PlayerUserSchema)
