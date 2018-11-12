let redbirdOptions = {
  port: 80,
}
let registerOptions = {}


if (process.env.NODE_ENV == 'production') {
  redbirdOptions = {
    ...redbirdOptions,
    letsencrypt: {
      path: __dirname + '/certs',
      port: 9999,
    },
    ssl: {
      http2: true,
      port: 443,
    },
  },

  registerOptions = {
    ...registerOptions,
    ssl: {
      letsencrypt: {
        email: 'bingsteup@gmail.com',
      }
    }
  };
}

const proxy = require('redbird')(redbirdOptions);

proxy.register('http://localhost:4300', 'http://0.0.0.0:4000', registerOptions);
proxy.register('http://localhost:4300', 'http://0.0.0.0:3000', registerOptions);
