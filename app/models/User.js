import crypto from 'crypto'
import bcrypt from 'bcrypt'

import mongoose from 'app/services/database/mongodb'
import { Token } from '.';

const SALT_WORK_FACTOR = 10

const Schema = mongoose.Schema

import { ImageSchema } from './types';

export const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  salt: {
    type: String,
    index: true,
  },
  password: {
    type: String,
    index: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  photoUrl: String,
  profileImages: [ImageSchema],
  externalId: String,
})

class UserClass {
  async verifyPassword (password) {
    const saltedPassword = await bcrypt.hash(password, this.salt)
    return saltedPassword === this.password;
  }

  async generateToken () {
    return new Token({
      user: this.id,
    }).save()
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  async matches () {
    return []
  }
}

UserSchema.loadClass(UserClass)

UserSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(20).toString('hex')
  }
  next()
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, this.salt)

  next();
});

export const User = mongoose.model('User', UserSchema)
