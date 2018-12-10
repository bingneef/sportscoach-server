import { RedisPubSub } from 'graphql-redis-subscriptions';
import redisClient from '../redis';

let pubsub = {};
if (process.env.MOCK_SERVER !== 'true') {
  pubsub = new RedisPubSub({
    publisher: redisClient(),
    subscriber: redisClient(),
  });
}

export default pubsub
