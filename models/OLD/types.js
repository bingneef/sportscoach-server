import mongoose from '../../services/database/mongodb'
const Schema = mongoose.Schema

export const ImageSchema = new Schema({
  path: String,
  height: Number,
  width: Number,
  size: String,
  colorScheme: [String],
})
