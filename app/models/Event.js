import mongoose from 'app/services/database/mongodb'
import { Match, Player, Team } from '.'

const Schema = mongoose.Schema

export const timingKinds = ['TIMING_PERIOD_START', 'TIMING_PERIOD_END', 'TIMING_PAUSED', 'TIMING_RESUMED']

export const EventSchema = new Schema({
  matchId: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  kind: {
    type: String,
    enum: ['GOAL', 'ASSIST', 'STARTING_LINEUP', 'SUB_IN', 'SUB_OUT', ...timingKinds],
    index: true,
    required: true,
  },
  value: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

class EventClass {
  async match() {
    return Match.findOne({_id: this.matchId})
  }

  async player() {
    return Player.findOne({_id: this.playerId})
  }

  async team() {
    return Team.findOne({_id: this.teamId})
  }
}

EventSchema.loadClass(EventClass)

export const Event = mongoose.model('Event', EventSchema)
