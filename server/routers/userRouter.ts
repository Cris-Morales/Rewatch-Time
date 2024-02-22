import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import userController from '../controllers/userController.js';
import episodeController from '../controllers/episodeController.js';
import { protect } from '../utils/auth.js';
const userRouter = express.Router();

userRouter.post(
  '/signup',
  userController.createNewUser,
  episodeController.getAllEpisodes,
  userController.initializeWatchList,
  userController.rememberUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('signup success');
    const { expirationDate } = res.locals.expirationDate;

    res.cookie('jwt', res.locals.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expirationDate,
    });

    return res.status(201).json({ message: 'success' });
  },
);

userRouter.post(
  '/login',
  userController.loginUser,
  userController.rememberUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    const { expirationDate } = res.locals.expirationDate
    console.log('login success');

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
  protect,
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

userRouter.delete(
  '/deleteUser',
  protect,
  userController.deleteUser,

  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('logging out, clearing jwt cookie');

    // delete the jwt to log them out of the session.
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
    });
    return res.status(200).json('user deleted, goodbye');
  },
);

userRouter.put(
  '/userIcon',
  protect,
  userController.updateUserIcon,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('user icon updated');
    return res.status(200).json('success!');
  },
);

userRouter.get(
  '/userIcon',
  protect,
  userController.getUserIcon,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('icon retrieved');
    return res.status(200).json(res.locals.userIcon);
  },
);

export default userRouter;
