import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = async (sequelize: Sequelize) => {
  const playsModel = sequelize.models?.Play
  if (!playsModel) {
    const Plays = sequelize.define('Plays', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      played_at: {
        type: DataTypes.DATE,
        allowNull: false 
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
    await Plays.sync({ force: true })
    return Plays
  }
}
