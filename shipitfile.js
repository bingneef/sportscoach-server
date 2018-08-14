module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-pm2')(shipit)
  require('shipit-yarn')(shipit)
  require('shipit-shared')(shipit)

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      deployTo: '/var/www/tess-api',
      repositoryUrl: 'git@github.com:bingneef/tess-server.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 10,
      shallowClone: true,
      dirToCopy: '',
      yarn: {
        remote: false,
      },
      shared: {
        overwrite: false,
        files: [
          'app.json',
          '.env',
          'config/firebase.json',
        ],
      }
    },
    production: {
      branch: 'master',
      servers: 'bing@5.157.85.46'
    },
  })
}


