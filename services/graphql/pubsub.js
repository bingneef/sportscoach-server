import { RedisPubSub } from 'graphql-redis-subscriptions';
import redisClient from '../redis';

const pubsub = new RedisPubSub({
  publisher: redisClient(),
  subscriber: redisClient(),
});
export default pubsub
