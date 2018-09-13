import { Event } from '../../../../models';

export const getEventFeedForMatch = async ({ ctx }, { matchId, size, offset }) => {
  if (size > 100 || size < 1) {
    size = 25
  }

  const search = { matchId }
  const count = await Event.find(search).count()
  const data = (await Event.find(search).sort('-createdAt').limit(size).skip(offset)).reverse()

  return {
    matchId,
    count,
    data,
  }
}

export default {
  Query: {
    events: async ({ ctx }) => {
      const payload = {}
      return await Event.find(payload).sort('-createdAt')
    },
    eventById: async ({ ctx }, { id } ) => await ctx.dataLoaders.eventById.load(id),
  },
  Mutation: {
    createEvent: async ({ ctx }, { event: { kind, teamId = null, matchId } }) => {
      const event = await new Event({
        kind,
        teamId,
        matchId,
      }).save()

      return event;
    },
  },
  Event: {
    match: async (event, _, __, { rootValue: { ctx } }) => {
      return await ctx.dataLoaders.matchById.load(event.matchId)
    },
    matchPlayer: async (event, _, __, { rootValue: { ctx } }) => {
      return await ctx.dataLoaders.matchPlayerById.load(event.matchPlayerId)
    },
  },
}
