import mongoose from 'app/services/database/mongodb'

export const timingKinds = ['TIMING_PERIOD_START', 'TIMING_PERIOD_END', 'TIMING_PAUSED', 'TIMING_RESUMED']

const ModelSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  kind: {
    type: String,
    enum: ['GOAL', 'ASSIST', 'STARTING_LINEUP', 'SUB_IN', 'SUB_OUT', ...timingKinds],
    index: true,
    required: true,
  },
  value: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

export default ModelSchema