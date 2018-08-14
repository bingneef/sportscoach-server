import Raven from 'raven'
import constants from './../../config/constants'

const guard = process.env.NODE_ENV !== 'production'

export const initSentry = () => {
  if (guard) {
    return
  }

  Raven.config(constants.tokens.sentry).install()
}

export const sendException = e => {
  if (guard) {
    return
  }

  Raven.captureException(e)
}
