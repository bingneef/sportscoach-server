import { Message } from '../../models'
import { mapValueResponse } from 'map-array-response'

export const batchGetMessageById = ids => {
  return new Promise(async (resolve, reject) => {
    const messages = await Message.find({ _id: ids })
    const response = mapValueResponse(ids, 'id', messages)
    resolve(response)
  })
}
