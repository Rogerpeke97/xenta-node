import express from 'express'
import userController from './user/User'

const initializeControllers = (app: express.Application) => {
  userController(app)
}


export default initializeControllers