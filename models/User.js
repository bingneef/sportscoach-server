import mongoose from '../services/database/mongodb'
import crypto from 'crypto'
import { Credit, Message } from './index'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
  kind: {
    type: String,
    enum: ['CAREGIVER', 'BUDDY'],
    required: true,
  },
  email: String,
  familyName: String,
  givenName: String,
  name: String,
  photoUrl: String,
  externalId: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
    unique: true,
  },
  creditsRemaining: {
    type: Number,
    default: 0,
  },
})

class UserClass {
  async calculateCreditsRemaining () {
    try {
      const creditsUsed = await Message.find({senderId: this._id}).count()

      const totalCredits = await Credit.aggregate(
        { $match: { userId: this.id, $or: [{'payment.status': 'PAID'}, {'payment.status': 'PAIDOUT'}] } },
        { $group: { _id: null, total: { $sum: { $add: ['$credits'] } } } }
      )

      // If no top-ups found..
      if (totalCredits.length == 0) {
        this.set({creditsRemaining: -creditsUsed})
      } else {
        this.set({ creditsRemaining: totalCredits[0].total - creditsUsed })
      }

      await this.save()
    } catch (e) { console.log(e) }
  }
}

UserSchema.loadClass(UserClass)

UserSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(20).toString('hex')
  }
  next()
})

export const User = mongoose.model('User', UserSchema)
