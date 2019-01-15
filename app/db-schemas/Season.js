import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
});

export default ModelSchema
