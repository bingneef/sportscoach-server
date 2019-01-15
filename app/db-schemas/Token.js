import crypto from 'crypto'
import mongoose from 'app/services/database/mongodb'

const TokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  token: {
    type: String,
    unique: true,
  },
});

TokenSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(20).toString('hex')
  }
  next()
})

export default TokenSchema;
