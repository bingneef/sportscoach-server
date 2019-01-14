import pick from 'lodash/pick';
import { Event } from 'app/models';

export default {
  Mutation: {
    createEvent: async ({ ctx }, { event }) => {
      try {
        const params = pick(event, ['teamId', 'matchId', 'playerId', 'parentId', 'kind', 'value'])
        return new Event(params).save();
      } catch (error) {
        ctx.throw(422, 'UNEXPECTED_ERROR');
      }
    },
    updateEvent: async ({ ctx }, { event }) => {
      try {
        const params = pick(event, ['teamId', 'matchId', 'playerId', 'parentId', 'kind', 'value'])
        const resp = Event.findByIdAndUpdate(event.id, {'$set': params}, {new: true})
        if (!resp) {
          ctx.throw(404, 'EVENT_NOT_FOUND');
        }
        return resp
      } catch (error) {
        ctx.throw(422, 'UNEXPECTED_ERROR');
      }
    },
    deleteEvent: async ({ ctx }, { id }) => {
      try {
        return Event.remove({ _id: id })
      } catch (error) {
        ctx.throw(422, 'UNEXPECTED_ERROR');
      }
    },
  },
  Event: {
    match: async (match, _, __, { rootValue: { ctx } }) => await match.match(),
    team: async (match, _, __, { rootValue: { ctx } }) => await match.team(),
    player: async (match, _, __, { rootValue: { ctx } }) => await match.player(),
  },
};
