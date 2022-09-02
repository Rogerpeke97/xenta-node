import database from "../../models"

export const insertPlay = async (user_id: Number, last_played_at: Array<Date>= []) => {
  const Play = database.sequelize.models.Plays
  const playCreated = await Play.create({
    user_id,
    last_played_at
  })
  return playCreated.dataValues
}
