import { Sequelize } from 'sequelize'
import { initPlaysModel } from './Plays/Plays'
import { initUserModel, initUserModelRelationships } from './User/User'
import sequelize from '../utils/sequelize/init'

const initModelsRelationships = () => {
  initUserModelRelationships()
}

const initializeORMAndModels = () => {
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
  initUserModel()
  initPlaysModel()
  initModelsRelationships()
}
export default initializeORMAndModels 
