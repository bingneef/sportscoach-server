import { User, Credit, Message } from '../../../../models'

export default {
  Query: {
    currentUser: async ({ ctx }) => ctx.currentUser,
    exploreUsers: async ({ ctx }) => await User.find(),
  },
  Mutation: {
    validateToken: async ({ ctx }, { token }) => await ctx.dataLoaders.user.load(token),
    updateUser: async ({ ctx }, { user: { photoUrl } }) => {
      ctx.currentUser.set({photoUrl})
      return await ctx.currentUser.save()
    },
  },
  User: {
    creditsRemaining: async (user, _, __, { rootValue: { ctx } }) => {
      if (ctx.currentUser.kind !== 'BUDDY') {
        return -1
      }
      return user.creditsRemaining
    }
  }
}
