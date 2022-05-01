import { Sequelize } from 'sequelize'
import ServerConfig from '../utils/ServerConfig'
import { initUserModel } from './User/User'

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
  
  const checkSequelizeConnection = async () => {
    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  
  checkSequelizeConnection()

  initUserModel(sequelize)
}