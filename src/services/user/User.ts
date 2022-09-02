import { insertLeaderboard } from '../../repositories/leaderboard/Leaderboard'
import { insertPlay } from '../../repositories/play/Play'
import { insertUser, selectAllUsers, selectUser } from '../../repositories/user/User'
import Logger from '../../utils/Logger'

export const getAllUsers = async() => {
  try {
    const users = await selectAllUsers()
    return users
  } catch(error) {
    Logger.error(error)
  }
}

export const getUser = async (userId: string) => {
  try {
    const userFound = await selectUser(userId)
    return userFound
  } catch(error) {
    Logger.error(error)
  }
}

export const createUser = async (email: string, username: string, 
  birthday: Date, password: string) => {
  try {
    const insertedUser = await insertUser(email, username, birthday, password)
    return insertedUser
  } catch(error) {
    Logger.error(error)
  }
}
