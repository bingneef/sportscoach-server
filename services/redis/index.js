import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import constants from '../../config/constants';

const options = {
  host: constants.redis.url,
  port: constants.redis.port,
  retry_strategy: options => {
    return Math.max(options.attempt * 100, 3000);
  }
};

export default () => new Redis(options);
