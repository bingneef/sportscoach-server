import { Match } from '../../../../models';
import { getEventFeedForMatch } from './event'

export default {
  Query: {
    matches: async ({ ctx }) => {
      const payload = {}
      return await Match.find(payload).sort('-createdAt')
    },
    matchById: async ({ ctx }, { id } ) => await ctx.dataLoaders.matchById.load(id),
  },
  Match: {
    eventFeed: async (match, { size, offset }, __, { rootValue: { ctx } }) => {
      return await getEventFeedForMatch({ ctx }, { matchId: match.id, size, offset})
    },
  },
}
