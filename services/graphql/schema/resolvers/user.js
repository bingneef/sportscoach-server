export default {
  Query: {
    currentUser: async ({ ctx }) => ctx.currentUser,
  },
  Mutation: {
    validateToken: async ({ ctx }, { token }) => await ctx.dataLoaders.user.load(token),
    updateUser: async ({ ctx }, { user: { photoUrl } }) => {
      ctx.currentUser.set({photoUrl})
      return await ctx.currentUser.save()
    },
  },
}
