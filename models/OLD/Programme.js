import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const ProgrammeSchema = new Schema({
  weddingId: {
    type: String,
    index: true,
    required: true,
  },
  title: String,
  startAt: Date,
})

class ProgrammeClass { }

ProgrammeSchema.loadClass(ProgrammeClass)

export const Programme = mongoose.model('Programme', ProgrammeSchema)
