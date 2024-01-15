import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import userController from '../controllers/userController.js';
import { protect } from '../utils/auth.js';
const userRouter = express.Router();

userRouter.post(
  '/signup',
  userController.createNewUser,
  // after success:
  // initialized user watched episodes list in database
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('signup success', req.body.remember);
    const expires = req.body.remember
      ? new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000)
      : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    res.cookie('jwt', res.locals.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expires,
    });

    return res.status(201).json({ message: 'success' });
  },
);

userRouter.post(
  '/login',
  userController.loginUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('login success', req.body.remember);
    const expirationDate = req.body.remember
      ? new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000)
      : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    console.log(expirationDate);
    res.cookie('jwt', res.locals.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expirationDate,
    });

    return res.status(201).json({ message: 'success' });
  },
);

userRouter.get(
  '/username',
  protect,
  userController.getUsername,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('username success');
    return res.status(201).json(res.locals.user);
  },
);

userRouter.get(
  '/isLoggedIn',
  protect,
  userController.isLoggedIn,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('user is logged in');
    return res.status(201).json(res.locals.user);
  },
);

userRouter.get(
  '/logout',
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('logging out, clearing jwt cookie');

    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });
    return res.status(200).json('logged out');
  },
);

export default userRouter;
