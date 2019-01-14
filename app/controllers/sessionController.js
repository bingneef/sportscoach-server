import { User } from 'app/models'
import firebase from 'app/services/firebase'

export const login = async (ctx, next) => {
  try {
    const idToken = ctx.request.body.idToken
    const decodedToken = await firebase.auth().verifyIdToken(idToken)
    const user = await User.findOne({externalId: decodedToken.uid})

    if (user) {
      ctx.body = { token: user.token }
    } else {
      ctx.status = 404
    }
  } catch (e) {
    ctx.status = 422
  } finally {
    return
  }
}
