import mongoose from '../services/database/mongodb'
const Schema = mongoose.Schema

export const ConversationSchema = new Schema(
  {
    buddyId: {
      type: String,
      index: true,
      required: true,
    },
    caregiverId: {
      type: String,
      index: true,
      required: true,
    },
    caregiverLastReadAt: Date,
    buddyLastReadAt: Date,
  },
  {
    timestamps: true
  },
)

export const Conversation = mongoose.model('Conversation', ConversationSchema)
