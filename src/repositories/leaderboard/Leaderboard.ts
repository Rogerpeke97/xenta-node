import database from "../../models"

export const insertLeaderboard = async (user_id: Number, score: Number=0,
  played_at: Date) => {
  const Leaderboard = database.sequelize.models.Leaderboard
  const initialScore = await Leaderboard.create({
    user_id,
    score,
    played_at
  })
  return initialScore.dataValues
}
