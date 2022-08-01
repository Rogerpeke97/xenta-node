import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = async (sequelize: Sequelize) => {
  const userModel = sequelize.models?.User
  if (!userModel) {
    const User = sequelize.define('User', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: DataTypes.STRING,
      birthday: DataTypes.DATE,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    })
    await User.sync({ force: true })
    return User
  } else {
    userModel.hasOne(sequelize.models?.Plays, { foreignKey: 'user_id' })
    userModel.hasOne(sequelize.models?.Leaderboard, { foreignKey: 'user_id' })
  }
}
