const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async (ctx, next) => {
  ctx.testid = ctx.headers.testid;
  await timeout(500)
  return next();
}
