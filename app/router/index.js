import Router from 'koa-router'
import { graphqlKoa } from 'apollo-server-koa'
import schema from 'app/graphql/schema/index'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const router = new Router()

router.all('/api',
  (ctx, next) => graphqlKoa({
    schema,
    validationRules: [
      depthLimit(10),
      createComplexityLimitRule(100000),
    ],
    rootValue: {
      ctx,
    },
    tracing: true,
    cacheControl: true,
  })(ctx, next)
)

// Other routes
router.all('/status', async (ctx) => {
  ctx.body = { alive: true }
})

export default router
