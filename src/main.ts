import express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import Logger from './utils/Logger'
import ServerConfig from './utils/ServerConfig'
import { InitializeORMAndModels } from './models/init'

export const ExpressApp: express.Application = express()
const server = http.createServer(ExpressApp)
InitializeORMAndModels()
console.log(ExpressApp)

server.listen(ServerConfig.PORT, () => {
  Logger.info(`Server running on port ${ServerConfig.PORT}`)
})
