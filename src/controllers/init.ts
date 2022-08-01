import express from 'express'
import userController from './user/User'

const initializeControllers = (app: express.Application) => {
  app.use(express.json())
  userController(app)
}


export default initializeControllers