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
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('signup success');
    res.cookie('jwt', res.locals.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(201).send('success');
  },
);

userRouter.post(
  '/login',
  userController.loginUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('login success');
    res.cookie('jwt', res.locals.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(201).send('success');
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

export default userRouter;
