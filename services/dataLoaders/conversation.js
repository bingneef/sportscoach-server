import { Conversation } from '../../models'
import { mapValueResponse } from 'map-array-response'

export const batchGetConversationById = ids => {
  return new Promise(async (resolve, reject) => {
    const conversations = await Conversation.find({ _id: ids })
    const response = mapValueResponse(ids, 'id', conversations)
    resolve(response)
  })
}
