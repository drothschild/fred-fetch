const promise = require('bluebird')
require('dotenv').config()

const options = {
  promiseLib: promise
}
const pgp = require('pg-promise')(options)

const url = `postgres://localhost:${process.env.POSTGRES_PORT}/fred`
exports.db = pgp(url)
