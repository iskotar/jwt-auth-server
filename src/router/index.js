import { Router } from 'express'
import { body } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'
import { userRegistration } from '../entities/user/controllers/userRegistration.js'
import { userLogin } from '../entities/user/controllers/userLogin.js'
import { userLogout } from '../entities/user/controllers/userLogout.js'
import { userActivation } from '../entities/user/controllers/userActivation.js'
import { userRefreshToken } from '../entities/user/controllers/userRefreshToken.js'
import { userGetAll } from '../entities/user/controllers/userGetAll.js'


const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 3, max: 32}),
  userRegistration
);

router.post('/login', userLogin);

router.post('/logout', userLogout);

router.get('/activate/:link', userActivation);

router.get('/refresh', userRefreshToken);

router.get('/users',
  authMiddleware,
  userGetAll
);

export default router;
