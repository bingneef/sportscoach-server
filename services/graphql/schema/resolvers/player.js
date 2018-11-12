import { Player } from '../../../../models';

export default {
  Query: {
    players: async ({ ctx }) => {
      const payload = {}
      return await Player.find(payload)
    },
  },
  Player: {
    goals: async (player, _, __, { rootValue: { ctx } }) => await player.goals(),
    stats: async (player, _, __, { rootValue: { ctx } }) => await player.stats(),
    matches: async (player, _, __, { rootValue: { ctx } }) => await player.matches(),
  },
};
