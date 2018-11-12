import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const NewsItemSchema = new Schema({
  weddingId: {
    type: String,
    index: true,
    required: true,
  },
  title: String,
  startAt: Date,
})

class NewsItemClass { }

NewsItemSchema.loadClass(NewsItemClass)

export const NewsItem = mongoose.model('NewsItem', NewsItemSchema)
