import mongoose from '../services/database/mongodb'
import crypto from 'crypto'
import { Credit, Message } from './index'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
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
})

class UserClass { }

UserSchema.loadClass(UserClass)

UserSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(20).toString('hex')
  }
  next()
})

export const User = mongoose.model('User', UserSchema)
