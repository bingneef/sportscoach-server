import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const WeddingSchema = new Schema({
  name: String,
  startDate: Date,
})

class WeddingClass { }

WeddingSchema.loadClass(WeddingClass)

export const Wedding = mongoose.model('Wedding', WeddingSchema)
