import { Conversation, Message } from '../../../../models'
import { getMessageFeed } from './message'

export default {
  Query: {
    getConversations: async ({ ctx }) => {
      let payload = {}
      if (ctx.currentUser.kind == 'CAREGIVER') {
        payload = { caregiverId: ctx.currentUser._id, }
      } else {
        payload = { buddyId: ctx.currentUser._id, }
      }

      return await Conversation.find(payload).sort('-createdAt')
    },
    getConversation: async ({ ctx }, { conversationId }) => {
      if (!conversationId) {
        return {}
      }
      return await ctx.dataLoaders.conversationById.load(conversationId)
    },
  },
  Mutation: {
    createConversation: async ({ ctx }, { conversation }) => {
      return await new Conversation(conversation).save()
    },
    setLastRead: async ({ ctx }, { conversationId }) => {
      const conversation = await ctx.dataLoaders.conversationById.load(conversationId)
      let field
      if (conversation.buddyId == ctx.currentUser.id) {
        field = 'buddyLastReadAt'
      } else if (conversation.caregiverId == ctx.currentUser.id) {
        field = 'caregiverLastReadAt'
      } else {
        throw('NOT_FOUND')
      }

      if (conversation[field]) {
        return conversation
      }

      const payload = {}
      payload[field] = new Date()

      return await conversation.set(payload).save()
    },
  },
  Conversation: {
    messageFeed: async (conversation, { size, offset }, __, { rootValue: { ctx } }) => {
      return await getMessageFeed({ ctx }, { conversationId: conversation.id, size, offset})
    },
    buddy: async (conversation, _, __, { rootValue: { ctx } }) => {
      return await ctx.dataLoaders.userById.load(conversation.buddyId)
    },
    caregiver: async (conversation, _, __, { rootValue: { ctx } }) => {
      return await ctx.dataLoaders.userById.load(conversation.caregiverId)
    },
    otherUser: async (conversation, _, __, { rootValue: { ctx } }) => {
      let id
      if (ctx.currentUser.kind == 'CAREGIVER') {
        id = conversation.buddyId
      } else {
        id = conversation.caregiverId
      }
      return await ctx.dataLoaders.userById.load(id)
    },
  }
}
