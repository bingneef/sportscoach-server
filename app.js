import 'app-module-path/register';

import Koa from 'koa'
import Helmet from 'koa-helmet'
import ResponseTime from 'koa-response-time'
import KoaLogger from 'koa-logger-winston'
import koaBody from 'koa-bodyparser'
import koaStatic from 'koa-static'
import { Engine } from 'apollo-engine'
import compress from 'koa-compress'
import cors from '@koa/cors'

import { execute, subscribe } from 'graphql'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import schema from './app/graphql/schema/index'

import constants from './config/constants'
import logger from './app/services/logger'

import router from './app/router'
import sessionRouter from './app/router/session'
import servicesRouter from './app/router/services'

import AuthenticationMiddleware from './app/middleware/authentication'
import DataLoadersMiddleware from './app/middleware/dataLoaders'

import { initCron } from './cron'
import { initSentry } from './app/services/sentry'
import { User } from './app/models';

const serverPort = constants.serverPort
const app = new Koa()
app.use(cors())

// Apollo Engine
if (process.env.NODE_ENV == 'production' && constants.tokens.apolloEngine) {
  const engine = new Engine({
    engineConfig: {
      apiKey: constants.tokens.apolloEngine,
      logging: {
        level: 'DEBUG'
      }
    },
    graphqlPort: serverPort,
    endpoint: '/api',
    dumpTraffic: true,
  });
  engine.start()
  app.use(engine.koaMiddleware())
}

initCron()
initSentry()

// Middleware
app.use(DataLoadersMiddleware)
app.use(KoaLogger(logger))
app.use(ResponseTime())
app.use(compress())
app.use(Helmet())
app.use(koaBody())

// Authentication
app.use(sessionRouter.routes()).use(sessionRouter.allowedMethods())
app.use(servicesRouter.routes()).use(servicesRouter.allowedMethods())
app.use(AuthenticationMiddleware)

// Routes
app.use(router.routes()).use(router.allowedMethods())
app.use(koaStatic('./public'))

if (!module.parent) {
  const ws = createServer(app.callback())
  ws.listen(serverPort, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
      onConnect: async (connectionParams, webSocket) => {
        let userId = -1;
        if (connectionParams.authToken) {
          const user = await User.findOne({ token: connectionParams.authToken })
          if (user) {
            userId = user._id;
          }
        }
        return { userId }
      }
    }, {
      server: ws,
      path: '/subscriptions',
    })
  })

  console.log(`GraphQL Server is now running on ${constants.protocol}://${constants.baseUrl}:${serverPort}`)
  console.log(`Version: ${constants.version}`)
  console.log(`Environment: ${(process.env.NODE_ENV || 'dev')}`)
}
