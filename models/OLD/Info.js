import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const InfoSchema = new Schema({
  weddingId: {
    type: String,
    index: true,
    required: true,
  },
  title: String,
  content: String,
})

class InfoClass { }

InfoSchema.loadClass(InfoClass)

export const Info = mongoose.model('Info', InfoSchema)
