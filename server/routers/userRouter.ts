import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

const userRouter = express.Router();
// import userController from '../controllers/userController.js'

userRouter.post('/signup', (req, res) => {
  res.status(200).json(res.locals.userData);
});

export default userRouter;
