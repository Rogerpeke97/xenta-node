import express from 'express'
import { ExpressApp } from '../../main'
import { getAllUsers } from '../../services/user/User'
import Logger from '../../utils/Logger'

const authController = async(app: express.Application) => {
  const userController = express.Router()
  userController.get('/', async (request: express.Request, response: express.Response) => {
    const users = await getAllUsers()
    Logger.info('users found', users)
    response.json(users)
  })
}


export default authController
