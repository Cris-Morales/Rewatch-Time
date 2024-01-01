import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post(
  '/signup',
  userController.createNewUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('success');
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
  userController.signInUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('success');
    return res.status(201).json(res.locals);
  },
);

export default userRouter;
