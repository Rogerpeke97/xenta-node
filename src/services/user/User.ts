import database from "../../models"

export const getAllUsers = async () => {
  console.log(database)
  return await database.sequelize.models.User.findAll()
}
