import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const TeamUserSchema = new Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: String,
    enum: ['MEMBER', 'FOLLOWER'],
    index: true,
    required: true,
  },
});

export const TeamUser = mongoose.model('TeamUser', TeamUserSchema)
