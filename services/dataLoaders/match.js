import { Match } from '../../models'
import { mapValueResponse } from 'map-array-response'

export const batchGetMatchById = ids => {
  return new Promise(async (resolve, reject) => {
    const matches = await Match.find({ _id: ids })
    const response = mapValueResponse(ids, 'id', matches)
    resolve(response)
  })
}
