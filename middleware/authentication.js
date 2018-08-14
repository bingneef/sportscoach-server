import Router from 'koa-router'

module.exports = async (ctx, next) => {
  const unauthorized = {
    errors: [{
      message: 'UNAUTHORIZED',
    }]
  }

  const badRequest = {
    errors: [{
      message: 'BADREQUEST',
    }]
  }

  try {
    const token = ctx.query.token || ctx.request.header['x-auth']
    ctx.currentUser = await ctx.dataLoaders.userByToken.load(token)
    if (!ctx.currentUser) {
      ctx.body = unauthorized
      return null
    }
  } catch (e) {
    ctx.body = badRequest
    return null
  }

  await next()
}
