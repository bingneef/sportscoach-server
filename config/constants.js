import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.join(__dirname, "../.env")})

const serverPort = process.env.PORT || 4000
const baseUrl = process.env.BASE_URL || 'localhost'
const protocol = process.env.PROTOCOL || 'http'
const socketProtocol = process.env.SOCKET_PROTOCOL || 'ws'

export default {
  version: '0.0.1',
  protocol,
  serverPort,
  baseUrl,
  redis: {
    port: process.env.REDIS_PORT || 6379,
    url: '0.0.0.0',
  },
  mongoDatabaseUrl: process.env.MONGODB_URL || `mongodb://${baseUrl}:27017/sportscoach`,
  elasticSearch: {},
  staticUrl: process.env.STATIC_URL || `${protocol}://${baseUrl}:${serverPort}`,
  tokens: {
    apolloEngine: process.env.APOLLO_ENGINE_KEY,
    sentry: process.env.SENTRY_KEY,
  },
  frontEnd: {
    url: process.env.FRONT_END_URL || 'http://localhost:3030',
  }
};
