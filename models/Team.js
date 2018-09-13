import mongoose from '../services/database/mongodb'

const Schema = mongoose.Schema

export const TeamSchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true,
  },
})

class TeamClass { }

TeamSchema.loadClass(TeamClass)

export const Team = mongoose.model('Team', TeamSchema)
