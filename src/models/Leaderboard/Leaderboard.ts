import { Sequelize, Model, DataTypes } from 'sequelize';

export const initLeaderboardModel = (sequelize: Sequelize) => {
  const Leaderboard = sequelize.define('Leaderboard', {
    user_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    played_at: DataTypes.DATE
  })
  
  Leaderboard.sync({force: true}).then(() => {
    return Leaderboard.create({
      user_id: 1,
      score: 200,
      rank: 1,
      played_at: new Date()
    })
  })
}