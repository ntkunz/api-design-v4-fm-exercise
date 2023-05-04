import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConvig

if (stage === 'production') {
   envConvig = require('./prod').default
} else if (stage === 'testing') {
   envConvig = require('./testing').default
} else {
   envConvig = require('./local').default
}

export default merge({
   stage,
   env: process.env.NODE_ENV,
   port: 3001,
   secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL
   }
}, envConvig)
