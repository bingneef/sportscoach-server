import mongoose from 'mongoose'
import constants from 'config/constants'
import promise from 'bluebird'

mongoose.Promise = promise;
if (process.env.MOCK_SERVER !== 'true') {
  mongoose.set('debug', process.env.NODE_ENV !== 'production');
  mongoose.connect(constants.mongoDatabaseUrl, {
    useNewUrlParser: true,
    promiseLibrary: global.Promise
  })
}

export default mongoose
