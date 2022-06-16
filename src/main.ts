import express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import Logger from './utils/Logger'
import ServerConfig from './utils/ServerConfig'
// import initializeORMAndModels from './models'
import initializeControllers from './controllers/init'

export const ExpressApp: express.Application = express()
const server = http.createServer(ExpressApp)
// initializeORMAndModels()
initializeControllers(ExpressApp)

server.listen(ServerConfig.PORT, () => {
  Logger.info(`Server running on port ${ServerConfig.PORT}`)
})
