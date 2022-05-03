import { Sequelize } from 'sequelize'
import ServerConfig from '../utils/ServerConfig'
import { initPlaysModel } from './Plays/Plays'
import { initUserModel, initUserModelRelationships } from './User/User'

const initModelsRelationships = (sequelize: Sequelize) => {
  initUserModelRelationships(sequelize)
}

export const InitializeORMAndModels = () => {
  const sequelize = new Sequelize(ServerConfig.DB_NAME, ServerConfig.DB_USER, ServerConfig.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
  const isSequelizeConnected = async () => {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
      return true
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      return false
    }
  }
  if(!isSequelizeConnected()) return
  initUserModel(sequelize)
  initPlaysModel(sequelize)
  initModelsRelationships(sequelize)
}