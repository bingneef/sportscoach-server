import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const SeasonSchema = new Schema({
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
});

export const Season = mongoose.model('Season', SeasonSchema)
