import { COOKIE_AGE } from '../../../../constants.js'
import ApiError from '../../../exceptions/apiError.js'
import tokenServices from '../../../service/tokenService.js'
import User from '../../../models/userModel.js'


export const userRefreshToken = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;

    if(!refreshToken){
      throw ApiError.UnauthorizedError()
    }

    const userDataFromToken = await tokenServices.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenServices.findToken(refreshToken);

    if(!userDataFromToken || !tokenFromDb){
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userDataFromToken.id)

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
        secure: false
      })

    return res.json(userData)

  } catch (e) {
    next(e)
  }
}
