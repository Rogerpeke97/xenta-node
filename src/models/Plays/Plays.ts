import { Sequelize, Model, DataTypes } from 'sequelize';

export const initPlaysModel = (sequelize: Sequelize) => {
  const Plays = sequelize.define('Plays', {
    user_id: DataTypes.INTEGER,
    last_played_at: DataTypes.ARRAY(DataTypes.DATE)
  })
  
  Plays.sync({force: true}).then(() => {
    return Plays.create({
      user_id: 1,
      last_played_at: [new Date(), new Date()]
    })
  })
}
