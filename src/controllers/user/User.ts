import express, { Router } from 'express'
import { createUser, getAllUsers, getUser } from '../../services/user/User'
interface UserParams {
  email: string,
  birthday: Date,
  username: string,
  password: string
}

const gets = (router: Router) => {
  router.get('/', async (request: express.Request, response: express.Response) => {
    const users = await getAllUsers()
    response.send(users)
  })
  router.get('/user/:userId', async (request: express.Request, response: express.Response) => {
    const userId = request.params.userId
    const users = await getUser(userId)
    response.send(users)
  })
}

const posts = (router: Router) => {
  router.post('/create', async (request: express.Request, response: express.Response) => {
    const { email, birthday, username, password }: UserParams = request.body
    const createdUser = await createUser(email, username, birthday, password)
    response.send(createdUser)
  })
}

module.exports = async(app: express.Application) => {
  const userController = express.Router()
  gets(userController)
  posts(userController)
  app.use('/users', userController)
}
