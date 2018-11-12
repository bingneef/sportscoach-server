import crypto from 'crypto'
import bcrypt from 'bcrypt'

import mongoose from '../../services/database/mongodb'
import { UserWedding } from './UserWedding';
import { Wedding } from './Wedding';

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
  token: {
    type: String,
    unique: true,
  },
})

class UserClass {
  async verifyPassword (password) {
    const saltedPassword = await bcrypt.hash(password, this.salt)
    return saltedPassword === password;
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }

  async weddings () {
    const weddingIds = (await UserWedding.find({userId: this.id}).select('weddingId'))
                                         .map(item => item.weddingId);
    return await Wedding.find({_id: weddingIds});
  }

  async comparePassword (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
  };
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
