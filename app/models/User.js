import crypto from 'crypto'
import bcrypt from 'bcrypt'

import { Token } from '.';

export default class User {
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

export const pre = [
  [
    'save', function (next) {
      if (!this.token) {
        this.token = crypto.randomBytes(20).toString('hex')
      }
      next()
    },
  ],
  [
    'save', async function (next) {
      const SALT_WORK_FACTOR = 10

      if (!this.isModified('password')) return next();
      this.salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
      this.password = await bcrypt.hash(this.password, this.salt)

      next();
    },
  ],
];