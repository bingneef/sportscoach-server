import { Credit } from '../../../../models'

export default {
  Query: {
    getCredits: async ({ ctx }) => {
      return await Credit.find({userId: ctx.currentUser.id})
    },
  },
}
