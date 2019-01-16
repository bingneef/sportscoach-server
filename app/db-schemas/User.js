import mongoose from 'app/services/database/mongodb'
import { ImageSchema } from './types';

export const ModelSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  salt: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    index: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  photoUrl: String,
  profileImages: [ImageSchema],
  externalId: String,
})

export default ModelSchema;
