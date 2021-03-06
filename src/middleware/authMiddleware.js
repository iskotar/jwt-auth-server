import ApiError from '../exceptions/apiError.js'
import tokenServices from '../service/tokenService.js'


export default function (req, res, next){
  try{
    const authHeader = req.headers.authorization;

    if(!authHeader) return next(ApiError.UnauthorizedError());

    const accessToken = authHeader.split(' ')[1];

    if(!accessToken) return next(ApiError.UnauthorizedError());

    const userData = tokenServices.validateAccessToken(accessToken);

    if(!userData) return next(ApiError.UnauthorizedError())

    req.user = userData;

    next();

  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
