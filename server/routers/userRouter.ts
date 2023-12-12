import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.createNewUser);

export default userRouter;
