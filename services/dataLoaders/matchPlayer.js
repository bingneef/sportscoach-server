import { MatchPlayer } from '../../models'
import { mapValueResponse } from 'map-array-response'

export const batchGetMatchPlayerById = ids => {
  return new Promise(async (resolve, reject) => {
    const matchPlayers = await MatchPlayer.find({ _id: ids })
    const response = mapValueResponse(ids, 'id', matchPlayers)
    resolve(response)
  })
}
