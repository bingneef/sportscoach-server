import Router from 'koa-router'
import DataLoader from 'dataloader'

import {
  batchGetUserByToken,
  batchGetConversationById,
  batchGetMessageById,
  batchGetUserById,
} from '../services/dataLoaders'

export default async (ctx, next) => {
  ctx.dataLoaders = {
    userByToken: new DataLoader(tokens => batchGetUserByToken(tokens)),
    userById: new DataLoader(ids => batchGetUserById(ids)),
    conversationById: new DataLoader(id => batchGetConversationById(id)),
    messageById: new DataLoader(id => batchGetMessageById(id)),
  }

  await next()
}
