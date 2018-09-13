import mongoose from '../services/database/mongodb'
import { SendEventPushNotification } from '../services/notifications'
import { Match } from './Match';

const Schema = mongoose.Schema

export const EventSchema = new Schema({
  kind: {
    type: String,
    enum: ['TIME', 'POINT'],
    required: true,
  },
  matchPlayerId: {
    type: String,
    index: true,
    required: false,
  },
  teamId: {
    type: String,
    index: true,
    required: false,
  },
  matchId: {
    type: String,
    index: true,
    required: true,
  },
})

class EventClass { }

EventSchema.loadClass(EventClass)

EventSchema.post('save', async (doc) => {
  if (doc.kind == 'POINT') {
    // const match = await Match.findOne({_id: doc.matchId});
    // await match.addPoint(doc);
  }
  await SendEventPushNotification(doc)
})

export const Event = mongoose.model('Event', EventSchema)
