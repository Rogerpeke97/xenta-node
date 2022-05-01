import { Sequelize, Model, DataTypes } from 'sequelize';
import ServerConfig from '../../utils/ServerConfig';

export const initUserModel = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  })
  
  User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      username: 'John',
      birthday: new Date()
    })
  })
}