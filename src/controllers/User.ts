import express from 'express'
import { ExpressApp } from '../main'
import UserModel from '../models/User'
import Logger from '../utils/Logger'


const userController = express.Router()

// GET
userController.get('/', async (request: express.Request, response: express.Response) => {
  const users = await UserModel.find({})
  Logger.info('users found', users)
  response.json(users)
})

ExpressApp.use('/users', userController)
