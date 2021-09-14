import { COOKIE_AGE } from '../../../../constants.js'
import User from '../../../models/userModel.js'
import ApiError from '../../../exceptions/apiError.js'
import bcrypt from 'bcrypt'
import tokenServices from '../../../service/tokenService.js'


export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(!user){
      throw ApiError.BedRequest('User with provided email does not exist');
    }

    if(!user.isActivated){
      throw ApiError.BedRequest('User is not activated. Please use activation link from registration email!')
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if(!isPasswordEqual){
      throw ApiError.BedRequest('Incorrect password');
    }

    const userDto = {
      email: user.email,
      id: user._id,
      isActivated: user.isActivated
    }

    const tokens = tokenServices.generateTokens({...userDto});

    await tokenServices.saveToken(userDto.id, tokens.refreshToken)

    const userData = { ...tokens, user: userDto }

    res.cookie(
      'refreshToken',
      userData.refreshToken,
      {
        maxAge: COOKIE_AGE,
        httpOnly: true,
        secure: false,
        sameSite: false
      })

    return res.json(userData)

  } catch (e) {
    next(e)
  }
}
