import Router from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import constants from '../config/constants'
import schema from '../services/graphql/schema/index'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const router = new Router()

router.all('/api',
  (ctx, next) => graphqlKoa({
    schema,
    validationRules: [
      depthLimit(10),
      createComplexityLimitRule(1000),
    ],
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
    endpointURL: '/api',
    subscriptionsEndpoint: `ws://${constants.baseUrl}:${constants.serverPort}/subscriptions`
  }))
}

// Other routes
router.all('/status', async (ctx) => {
  ctx.body = { alive: true }
})

export default router
