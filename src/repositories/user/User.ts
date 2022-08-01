import database from "../../models"

export const selectAllUsers = async () => {
  const User = database.sequelize.models.User
  return await User.findAll()
}

export const selectUser = async (userId: string) => {
  const User = database.sequelize.models.User
  return await User.findAll({
    where: {
      user_id: userId
    }
  })
}

export const insertUser = async (email: string, username: string, birthday: Date, password: string) => {
  const User = database.sequelize.models.User
  const userCreated = await User.create({
    username,
    email,
    birthday
  })
  return userCreated.dataValues
}
