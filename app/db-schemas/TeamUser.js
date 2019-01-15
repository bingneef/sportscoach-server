import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
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

export default ModelSchema;
