import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['LEAGUE', 'FRIENDLY', 'TOURNAMENT'],
    index: true,
    required: true,
  },
});

export default ModelSchema