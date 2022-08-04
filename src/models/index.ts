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
const ACTIONS = ['initModels', 'initRelationships']
const createModelsAndRelationships = async(action: string) => {
  const filesAndFolders = fs.readdirSync(__dirname)
  for(let j = 0; j < filesAndFolders.length; j++){
    const fileOrFolder = filesAndFolders[j]
    if (!isNotBaseIndexFile(fileOrFolder)) continue
    const fileDir = `${__dirname}/${fileOrFolder}`
    if (isFolder(fileDir)) {
      const filesInFolder = fs.readdirSync(`${fileDir}`)
      for(let i = 0; i < filesInFolder.length; i++){
        const file = filesInFolder[i]
        if (!isValidTsFile(file)) continue
        if(action === 'initModels'){
          const model = await require(path.join(`${fileDir}/${file}`))(sequelize)
          database[model.name] = model
        } else {
          await require(path.join(`${fileDir}/${file}`))(sequelize)
        }
      }
    }
  }
  Object.keys(database).forEach(modelName => {
    if (database[modelName]?.associate) {
      database[modelName]?.associate(database)
    }
  })
}
sequelize.drop().then(async() => {
  for(let i = 0; i < ACTIONS.length; i++){
    await createModelsAndRelationships(ACTIONS[i])
  }
  sequelize.sync({ force: true })
})
database.sequelize = sequelize
module.exports = database
export default database
