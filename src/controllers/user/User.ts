import express from 'express'
import { ExpressApp } from '../../main'
import { getAllUsers } from '../../services/user/User'
import Logger from '../../utils/Logger'

const userController = async(app: express.Application) => {
  const userController = express.Router()
  userController.get('/', async (request: express.Request, response: express.Response) => {
    const users = await getAllUsers()
    Logger.info('users found', users)
    response.json(users)
  })
  ExpressApp.use('/users/', userController)
}


export default userController
