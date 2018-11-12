import pubsub from '../graphql/pubsub'

export const SendAttendancePushNotification = async message => {
  await pubsub.publish('attendanceSubscription', { attendanceSubscription: message })
}
