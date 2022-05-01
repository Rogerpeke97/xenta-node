import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
})
const PORT = process.env.PORT

export default {
  PORT
}