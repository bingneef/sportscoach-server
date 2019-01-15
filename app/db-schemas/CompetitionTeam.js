import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  competitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition'
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
});

export default ModelSchema