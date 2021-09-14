import { validationResult } from 'express-validator'
import ApiError from '../../../exceptions/apiError.js'
import { COOKIE_AGE } from '../../../../constants.js'
import User from '../../../models/userModel.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { sendActivationMail } from '../../../service/mailService.js'
import tokenServices from '../../../service/tokenService.js'


export const userRegistration = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return next(ApiError.BedRequest('Validation error', errors.array()))
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user){
      throw ApiError.BedRequest(`User with ${email} already exist`)
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const activationLink = new mongoose.Types.ObjectId();

    const newUser = await User.create({email, password: hashPassword, activationLink})
    await sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = {
      email: newUser.email,
      id: newUser._id,
      isActivated: newUser.isActivated
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
