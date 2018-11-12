import Router from 'koa-router'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'
import constants from '../config/constants'
import schema from '../services/graphql/schema/index'
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { runBackgroundJob } from '../services/faktory';
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
  // await runBackgroundJob({jobtype: 'CalcStatsForMatch', args: ['5bd816b395e8d291dcc9ef8f'']})
  ctx.body = { alive: true }
})

export default router
