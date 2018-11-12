export default {
  Competition: {
    teams: async (match, _, __, { rootValue: { ctx } }) => await match.teams(),
  },
};
