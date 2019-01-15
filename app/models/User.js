import { Token } from '.';

export default class UserClass {
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