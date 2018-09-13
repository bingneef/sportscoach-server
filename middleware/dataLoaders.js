import Router from 'koa-router'
import DataLoader from 'dataloader'

import {
  batchGetUserByToken,
  batchGetUserById,
  batchGetEventById,
  batchGetMatchById,
  batchGetMatchPlayerById,
} from '../services/dataLoaders'

export default async (ctx, next) => {
  ctx.dataLoaders = {
    userByToken: new DataLoader(tokens => batchGetUserByToken(tokens)),
    userById: new DataLoader(ids => batchGetUserById(ids)),
    eventById: new DataLoader(id => batchGetEventById(id)),
    matchById: new DataLoader(id => batchGetMatchById(id)),
    matchPlayerById: new DataLoader(id => batchGetMatchPlayerById(id)),
  }

  await next()
}
