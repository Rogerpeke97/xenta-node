import * as dotenv from 'dotenv'
import Logger from './Logger'

dotenv.config()

const DB_NAME = process.env.PG_DB_NAME || ''
const DB_USER = process.env.PG_USERNAME || ''
const DB_PASS = process.env.PG_PASSWORD || ''

Logger.info(`Connecting to database: ${DB_NAME}`, `User: ${DB_USER}`, `Password: ${DB_PASS}`)

const PORT = process.env.PORT
export default {
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASS
}