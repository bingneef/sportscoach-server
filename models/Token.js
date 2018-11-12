import crypto from 'crypto'

import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const TokenSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  token: {
    type: String,
    unique: true,
  },
});

class TokenClass {
}

TokenSchema.pre('save', function (next) {
  console.log(this.token);
  if (!this.token) {
    this.token = crypto.randomBytes(20).toString('hex')
  }
  next()
})

TokenSchema.loadClass(TokenClass)
export const Token = mongoose.model('Token', TokenSchema)
