const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = async (ctx, next) => {
  await timeout(500)
  return next();
}
