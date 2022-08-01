import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = async (sequelize: Sequelize) => {
  const leaderboardModel = sequelize.models?.User
  if (!leaderboardModel) {
    const Leaderboard = sequelize.define('Leaderboard', {
      user_id: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      rank: DataTypes.INTEGER,
      played_at: DataTypes.DATE
    })
    await Leaderboard.sync({ force: true })
    await Leaderboard.create({
      user_id: 1,
      score: 200,
      rank: 1,
      played_at: new Date()
    })
    return Leaderboard
  }
}
