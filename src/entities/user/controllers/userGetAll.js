import User from '../../../models/userModel.js'


export const userGetAll = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users)

  } catch (e) {
    next(e)
  }
}
