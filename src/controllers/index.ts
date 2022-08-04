import express from 'express';

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const isFolder = (fileDir: string) => fs.statSync(fileDir).isDirectory()
const isNotBaseIndexFile = (file: string) => file !== basename
const isValidTsFile = (file: string) => file.slice(-3) === '.ts'
const expressApp: express.Application = express()
const addControllers = async() => {
  expressApp.use(express.json())  
  const filesAndFolders = fs.readdirSync(__dirname)
  for(let j = 0; j < filesAndFolders.length; j++){
    const fileOrFolder = filesAndFolders[j]
    if (!isNotBaseIndexFile(fileOrFolder)) continue
    const fileDir = `${__dirname}/${fileOrFolder}`
    if (isFolder(fileDir)) {
      const filesInFolder = fs.readdirSync(`${fileDir}`)
      for(let i = 0; i < filesInFolder.length; i++){
        const file = filesInFolder[i]
        if (!isValidTsFile(file)) continue
        await require(path.join(`${fileDir}/${file}`))(expressApp)
      }
    }
  }
}
addControllers().then(() => {
  module.exports = expressApp
})
export default expressApp
