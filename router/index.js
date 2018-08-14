import Router from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import constants from '../config/constants'
import schema from '../services/graphql/schema/index'

const router = new Router()

router.all('/graphql',
  (ctx, next) => graphqlKoa({
    schema,
    rootValue: {
      ctx,
    },
    tracing: true,
    cacheControl: true,
  })(ctx, next)
)

if (process.env.NODE_ENV !== 'production') {
  router.get('/graphiql', graphiqlKoa({
    schema,
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://${constants.baseUrl}:${constants.serverPort}/subscriptions`
  }))
}

// Other routes
router.all('/status', async (ctx) => {
  ctx.body = { alive: true }
})

export default router
