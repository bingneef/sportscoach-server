import { withFilter } from 'graphql-subscriptions'

import pubsub from '../../pubsub'
import { Message } from '../../../../models'

export const getMessageFeed = async ({ ctx }, { conversationId, size, offset }) => {
  if (size > 100) {
    size = 25
  }

  const search = { conversationId }
  const count = await Message.find(search).count()
  const data = (await Message.find(search).sort('-createdAt').limit(size).skip(offset)).reverse()

  return {
    conversationId,
    count,
    data,
  }
}

export default {
  Query: {
    getMessageFeed,
  },
  Mutation: {
    createMessage: async ({ ctx }, { conversationId, message }) => {
      const messageParams = {
        ...message,
        conversationId,
        senderId: ctx.currentUser.id,
      }
      return await new Message(messageParams).save()
    },
  },
  Subscription: {
    messageSubscription: {
      subscribe:
        withFilter(
          () => pubsub.asyncIterator('messageSubscription'),
          (payload, variables) => payload.messageSubscription.conversationId == variables.conversationId,
        )
    }
  },
  Message: {
    senderIsBuddy: (message) => !message.senderIsCaregiver,
    senderIsUser: async (message, { userId }) => {
      if (userId) {
        return userId == message.senderId
      } else {
        return null
      }
    },
  },
  MessageFeed: {
    conversation: async (messageFeed, _, __, { rootValue: { ctx } }) => {
      return await ctx.dataLoaders.conversationById.load(messageFeed.conversationId)
    },
  }
}
