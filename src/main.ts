import * as http from 'http'
import expressApp from './controllers'
import Logger from './utils/Logger'
import ServerConfig from './utils/ServerConfig'
require('./models/index')
require('./controllers/index')

const server = http.createServer(expressApp)
server.listen(ServerConfig.PORT, () => {
  Logger.info(`Server running on port ${ServerConfig.PORT}`)
})
