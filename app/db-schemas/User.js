import crypto from 'crypto'
import bcrypt from 'bcrypt'

import mongoose from 'app/services/database/mongodb'
import { ImageSchema } from './types';

const SALT_WORK_FACTOR = 10

export const ModelSchema = new mongoose.Schema({
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

ModelSchema.pre('save', function (next) {
  if (!this.token) {
    this.token = crypto.randomBytes(20).toString('hex')
  }
  next()
})

ModelSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
  this.password = await bcrypt.hash(this.password, this.salt)

  next();
});

export default ModelSchema;
