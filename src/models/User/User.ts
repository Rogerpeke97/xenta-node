import { Sequelize, Model, DataTypes } from 'sequelize';

export const initUserModel = (sequelize: Sequelize) => {
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
}

export const initUserModelRelationships = (sequelize: Sequelize) => {
  sequelize.models.User.hasOne(sequelize.models.Plays, { foreignKey: 'user_id' })
  // sequelize.models.User.hasOne(sequelize.models.Leaderboard, { foreignKey: 'user_id' })
}
