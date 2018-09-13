import { Event } from '../../models'
import { mapValueResponse } from 'map-array-response'

export const batchGetEventById = ids => {
  return new Promise(async (resolve, reject) => {
    const events = await Event.find({ _id: ids })
    const response = mapValueResponse(ids, 'id', events)
    resolve(response)
  })
}
