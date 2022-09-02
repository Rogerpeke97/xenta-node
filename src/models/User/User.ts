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
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    await User.sync({ force: true })
    return User
  } else {
    userModel.hasOne(sequelize.models?.Plays, { foreignKey: 'user_id' })
    userModel.hasOne(sequelize.models?.Leaderboard, { foreignKey: 'user_id' })
  }
}
