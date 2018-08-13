const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const PORT = process.env.PORT || 5000
app.listen(PORT);
