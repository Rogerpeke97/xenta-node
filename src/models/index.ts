import { Sequelize, Model } from 'sequelize'
import ServerConfig from '../utils/ServerConfig';

interface Database {
  [key: string]: Model | Sequelize | any
}
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const isFolder = (fileDir: string) => fs.statSync(fileDir).isDirectory()
const isValidFileAndNotBaseIndexFile = (file: string) => file.indexOf('.') !== 0 && file !== basename
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
fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    console.log(file, __dirname)
    const fileDir = `${__dirname}/${file}`
    if (isFolder(fileDir)) {
      const validFilesInFolder = fs.readdirSync(`${fileDir}`).filter((file: any) => 
        isValidFileAndNotBaseIndexFile(file) && isValidTsFile(file)
      )
      return validFilesInFolder.length > 0
    }
    return isValidFileAndNotBaseIndexFile(file) && isValidTsFile(file)
  })
  .forEach((file: any) => {
    const fileDir = `${__dirname}/${file}`
    if (isFolder(fileDir)) {
      const filesInFolder = fs.readdirSync(`${fileDir}`)
      filesInFolder.forEach((file: any) => {
        const model = require(path.join(`${fileDir}/${file}`))(sequelize)
        database[model.name] = model
      })
      return
    }
    const model = require(path.join(__dirname, file))(sequelize)
    database[model.name] = model
    console.log(database)
  })
Object.keys(database).forEach(modelName => {
  if (database[modelName]?.associate) {
    database[modelName]?.associate(database)
  }
})
database.sequelize = sequelize
module.exports = database

export default database
// const initModelsRelationships = () => {
//   initUserModelRelationships()
// }

// const initializeORMAndModels = () => {
//   const isSequelizeConnected = async () => {
//     try {
//       await sequelize.authenticate()
//       console.log('Connection has been established successfully.')
//       return true
//     } catch (error) {
//       console.error('Unable to connect to the database:', error)
//       return false
//     }
//   }
//   if(!isSequelizeConnected()) return
//   initUserModel()
//   initPlaysModel()
//   initModelsRelationships()
// }
// export default initializeORMAndModels 
