import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const UserWeddingSchema = new Schema({
  userId: {
    type: String,
    index: true,
    required: true,
  },
  weddingId: {
    type: String,
    index: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['HOST', 'GUEST'],
    index: true,
    required: true,
  },
})

class UserWeddingClass {
  get hasAccess () {
    return this.role == 'HOST' || this.role == 'GUEST'
  }

  get isHost () {
    return this.role == 'HOST'
  }
}

UserWeddingSchema.loadClass(UserWeddingClass)
UserWeddingSchema.index({ userId: 1, weddingId: 1 }, { unique: true });

export const UserWedding = mongoose.model('UserWedding', UserWeddingSchema)
