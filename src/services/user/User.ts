import sequelize from "../../utils/sequelize/init"

export const getAllUsers = async () => {
  return await sequelize.models.User.findAll()
}
