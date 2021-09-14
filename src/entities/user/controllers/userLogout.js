import tokenServices from '../../../service/tokenService.js'


export const userLogout = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies;
    const token = await tokenServices.removeToken(refreshToken);

    res.clearCookie('refreshToken');

    return res.json({ token })

  } catch (e) {
    next(e)
  }
}
