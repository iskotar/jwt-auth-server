import User from '../../../models/userModel.js'
import ApiError from '../../../exceptions/apiError.js'


export const userActivation = async (req, res, next) => {
  try {
    const activationLink = req.params.link;
    const user = await User.findOne({activationLink});

    if(!user){
      throw ApiError.BedRequest('Activation link is invalid')
    }

    user.isActivated = true;
    await user.save();

    await res.redirect(process.env.CLIENT_URL);

  } catch (e) {
    next(e)
  }
}
