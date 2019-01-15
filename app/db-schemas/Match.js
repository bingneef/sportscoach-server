import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['PLANNED', 'PROGRESS', 'COMPLETED'],
    index: true,
    required: true,
  },
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition'
  },
});

export default ModelSchema