import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
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

export default ModelSchema
