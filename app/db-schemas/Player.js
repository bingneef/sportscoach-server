import mongoose from 'app/services/database/mongodb'

const ModelSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  prefix: String,
  lastName: String,
});

export default ModelSchema