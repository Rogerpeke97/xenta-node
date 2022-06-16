import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  })
  User.sync({force: true}).then(() => {
    return User.create({
      username: 'John',
      birthday: new Date()
    })
  })
  return User
}

// export const initUserModelRelationships = () => {
//   sequelize.models.User.hasOne(sequelize.models.Plays, { foreignKey: 'user_id' })
//   // sequelize.models.User.hasOne(sequelize.models.Leaderboard, { foreignKey: 'user_id' })
// }
