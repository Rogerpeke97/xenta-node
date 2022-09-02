import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = async (sequelize: Sequelize) => {
  const leaderboardModel = sequelize.models?.Leaderboard
  if (!leaderboardModel) {
    const Leaderboard = sequelize.define('Leaderboard', {
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      played_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
    await Leaderboard.sync({ force: true })
    return Leaderboard
  }
}
