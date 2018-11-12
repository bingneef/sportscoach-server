import mongoose from '../../services/database/mongodb'

const Schema = mongoose.Schema

export const WeddingRoleSchema = new Schema({
  weddingId: {
    type: String,
    index: true,
    required: true,
  },
  token: String,
  role: {
    type: String,
    enum: ['HOST', 'GUEST'],
    index: true,
    required: true,
  },
})

class WeddingRoleClass { }

WeddingRoleSchema.loadClass(WeddingRoleClass)
WeddingRoleSchema.index({ weddingId: 1, role: 1 }, { unique: true });
WeddingRoleSchema.index({ weddingId: 1, token: 1 }, { unique: true });

export const WeddingRole = mongoose.model('WeddingRole', WeddingRoleSchema)
