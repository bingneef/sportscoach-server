import mongoose from 'app/services/database/mongodb'

export const ImageSchema = new mongoose.Schema({
  path: String,
  height: Number,
  width: Number,
  size: String,
  colorScheme: [String],
})
