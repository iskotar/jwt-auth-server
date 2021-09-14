import jwt from 'jsonwebtoken'
import Token from '../models/tokenModel.js'


const generateTokens = (payload) => {

  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn:  process.env.JWT_ACCESS_EXPIRES_IN})
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn:  process.env.JWT_REFRESH_EXPIRES_IN})

  return {
    accessToken,
    refreshToken
  }
}


const validateAccessToken = (token) => {
  try{
    const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    return userData;

  } catch (e) {
    return null;
  }
}


const validateRefreshToken = (token) => {
  try{
    const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
    return userData;

  } catch (e) {
    return null;
  }
}


const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId});

  if(tokenData){
    tokenData.refreshToken = refreshToken;
    return tokenData.save()
  }

  const token = await Token.create({user: userId, refreshToken})
  return token;
}


const removeToken = async (refreshToken) => {
  const tokenData = await Token.deleteOne({ refreshToken });

  return tokenData;
}


const findToken = async (refreshToken) => {
  const tokenData = await Token.findOne({ refreshToken });

  return tokenData;
}

export default {
  generateTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  removeToken,
  findToken
};
