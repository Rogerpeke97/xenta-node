import { Sequelize, Model, DataTypes } from 'sequelize';
import ServerConfig from '../../utils/ServerConfig';

export const initUserModel = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
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
}