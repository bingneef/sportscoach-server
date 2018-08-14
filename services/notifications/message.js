import pubsub from '../graphql/pubsub'

export const SendPush = async message => {
  await pubsub.publish('messageSubscription', { messageSubscription: message })
}
