import express from 'express'
import * as bodyParser from 'body-parser'
import * as http from 'http'
import Logger from './utils/Logger'
import ServerConfig from './utils/ServerConfig'

export const ExpressApp: express.Application = express()
const server = http.createServer(ExpressApp)

server.listen(ServerConfig.PORT, () => {
  Logger.info(`Server running on port ${ServerConfig.PORT}`)
})