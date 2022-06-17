import { Sequelize, Model } from 'sequelize'
import ServerConfig from '../utils/ServerConfig';

interface Database {
  [key: string]: Model | Sequelize | any
}
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const isFolder = (fileDir: string) => fs.statSync(fileDir).isDirectory()
const isNotBaseIndexFile = (file: string) => file !== basename
const isValidTsFile = (file: string) => file.slice(-3) === '.ts'
const database: Database = {}
const sequelize = new Sequelize(
  ServerConfig.DB_NAME, ServerConfig.DB_USER, ServerConfig.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})
fs.readdirSync(__dirname).forEach((file: string) => {
  if (!isNotBaseIndexFile(file)) return
  const fileDir = `${__dirname}/${file}`
  if (isFolder(fileDir)) {
    const filesInFolder = fs.readdirSync(`${fileDir}`)
    filesInFolder.forEach((file: string) => {
      if (!isValidTsFile(file)) return
      const model = require(path.join(`${fileDir}/${file}`))(sequelize)
      database[model.name] = model
    })
    return
  }
  const model = require(path.join(__dirname, file))(sequelize)
  database[model.name] = model
})
Object.keys(database).forEach(modelName => {
  if (database[modelName]?.associate) {
    database[modelName]?.associate(database)
  }
})
database.sequelize = sequelize
module.exports = database

export default database
