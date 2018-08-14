import mongoose from '../services/database/mongodb'
import { Conversation, User } from './index'
import { SendPush as SendMessagePushNotification } from '../services/notifications/message'

const Schema = mongoose.Schema

export const MessageSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ['TEXT', 'IMAGE'],
      default: 'TEXT',
    },
    payload: {
      type: String,
      required: true,
    },
    conversationId: {
      type: String,
      index: true,
      required: true,
    },
    senderId: {
      type: String,
      index: true,
      required: true,
    },
    senderIsCaregiver: Boolean,
  },
  {
    timestamps: true,
  }
)

MessageSchema.pre('save', async function (next) {
  try {
    const conversation = await Conversation.findOne({_id: this.conversationId}, 'caregiverId')
    if (!conversation) {
      return next(new Error('INVALID_CONVERSATION_ID'))
    }

    this.senderIsCaregiver = conversation.caregiverId == this.senderId
    next()
  } catch (e) {
    return next(new Error('INVALID_CONVERSATION_ID'))
  }
})

MessageSchema.pre('save', async function (next) {
  // No need to validate credit when senderIsCaregiver
  if (this.createdAt || this.senderIsCaregiver) {
   return next()
  }

  try {
    const user = await User.findOne({_id: this.senderId})
    if (!user) {
      return next(new Error('NO_USER'))
    } else if (user.creditsRemaining < 1) {
      return next(new Error('NO_CREDITS'))
    }
    return next()
  } catch (e) {
    return next(new Error('BAD_REQUEST'))
  }
})


MessageSchema.post('save', async (doc) => {
  if (doc.receivedAt) {
    return
  }

  // For buddy, calculate new credits
  if (!doc.senderIsCaregiver) {
    const user = await User.findOne({_id: doc.senderId})
    user.calculateCreditsRemaining()
  }

  await SendMessagePushNotification(doc)
})

export const Message = mongoose.model('Message', MessageSchema)
