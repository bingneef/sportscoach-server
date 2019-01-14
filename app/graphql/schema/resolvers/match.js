import { Match } from 'app/models';

export default {
  Query: {
    matches: async ({ ctx }) => {
      const payload = {}
      return await Match.find(payload)
    },
  },
  Match: {
    stats: async (match, _, __, { rootValue: { ctx } }) => await match.stats(),
    duration: async (match, _, __, { rootValue: { ctx } }) => await match.duration(),
    score: async (match, _, __, { rootValue: { ctx } }) => await match.score(),
    teams: async (match, _, __, { rootValue: { ctx } }) => await match.teams(),
    competition: async (match, _, __, { rootValue: { ctx } }) => await match.competition(),
    events: async (match, _, __, { rootValue: { ctx } }) => await match.events(),
  },
};
