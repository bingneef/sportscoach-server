import pubsub from '../graphql/pubsub'

export const SendEventPushNotification = async message => {
  await pubsub.publish('messageSubscription', { messageSubscription: message })
}
