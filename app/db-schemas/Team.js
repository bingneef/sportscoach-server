import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default ModelSchema