import express from 'express'
import { ExpressApp } from '../main'
import Logger from '../utils/Logger'
import sequelize from '../utils/sequelize/init'
const userController = express.Router()

// GET
userController.get('/', async (request: express.Request, response: express.Response) => {
  const users = await sequelize.models.User?.find({})
  Logger.info('users found', users)
  response.json(users)
})
console.log('here')
ExpressApp.use('/users/', userController)

module.exports = userController
