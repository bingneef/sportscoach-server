import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  kind: {
    type: String,
    enum: ['HOME', 'AWAY'],
    index: true,
  },
});

export default ModelSchema