import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.createNewUser);
userRouter.post(
  '/signin',
  userController.signInUser,
  (req: Request, res: Response, next: NextFunction): Response => {
    console.log('sucess');
    return res.status(201).json(res.locals);
  },
);

export default userRouter;
