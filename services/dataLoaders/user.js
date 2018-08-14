import { User } from '../../models'
import { mapValueResponse } from 'map-array-response'

export const batchGetUserByToken = tokens => {
  return new Promise(async (resolve, reject) => {
    const users = await User.find({ token: tokens })
    const response = mapValueResponse(tokens, 'token', users)
    resolve(response)
  })
}

export const batchGetUserById = ids => {
  return new Promise(async (resolve, reject) => {
    const users = await User.find({ _id: ids })
    const response = mapValueResponse(ids, 'id', users)
    resolve(response)
  })
}
