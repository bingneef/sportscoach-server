import mongoose from '../services/database/mongodb'
import { User } from './index'

const Schema = mongoose.Schema

const PaymentSchema = new Schema({
  externalId: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    enum: ['PAYMENT', 'THIRD_PARTY_PAYMENT', 'GIFT'],
    required: true,
  },
  method: {
    type: String,
    enum: ['IDEAL', 'THIRD_PARTY_PAYMENT', 'GIFT'],
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['OPEN', 'CANCELLED', 'PENDING', 'EXPIRED', 'FAILED', 'PAID', 'PAIDOUT', 'REFUNDED', 'CHARGED_BACK'],
    required: true,
    default: 'OPEN',
  },
  description: String,
  amount: {
    type: Number,
    required: true,
  },
  url: String,
})

export const CreditSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    payment: {
      type: PaymentSchema,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
)

CreditSchema.post('save', async (doc) => {
  const user = await User.findOne({_id: doc.userId})
  user.calculateCreditsRemaining()
})

export const Credit = mongoose.model('Credit', CreditSchema)
