import Router from 'koa-router'
import { Token } from '../models'

const badRequest = {
  errors: [{
    message: 'BADREQUEST',
  }]
}

const unauthorised = {
  errors: [{
    message: 'UNAUTHORISED',
  }]
}

module.exports = async (ctx, next) => {
  try {
    const token = ctx.query.token || ctx.request.header['x-auth-token']
    if (token) {
      const tokenObj = await Token.findOne({token}).populate('user');
      if (tokenObj) {
        ctx.currentToken = tokenObj;
        ctx.currentUser = tokenObj.user;
      } else {
        throw({type: 'GRAPHQL', message: unauthorised})
      }
    }
  } catch (error) {
    if (error.type == 'GRAPHQL') {
      ctx.body = error.message
    } else {
      ctx.body = badRequest
    }
    return null
  }

  await next()
}
