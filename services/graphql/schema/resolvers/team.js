import { Team } from '../../../../models';

export default {
  Query: {
    teams: async ({ ctx }) => {
      const payload = {}
      return await Team.find(payload)
    },
  },
  Team: {
    players: async (team, _, __, { rootValue: { ctx } }) => team.players(ctx),
    matches: async (team, _, __, { rootValue: { ctx } }) => team.matches(ctx),
  },
};
