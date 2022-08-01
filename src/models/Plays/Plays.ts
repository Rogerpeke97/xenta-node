import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = async (sequelize: Sequelize) => {
  const playsModel = sequelize.models?.User
  if (!playsModel) {
    const Plays = sequelize.define('Plays', {
      user_id: DataTypes.INTEGER,
      last_played_at: DataTypes.ARRAY(DataTypes.DATE)
    })
    await Plays.sync({ force: true })
    return Plays
  }
}
