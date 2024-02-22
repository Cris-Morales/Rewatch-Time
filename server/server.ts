import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import userRouter from './routers/userRouter.js';
import episodesRouter from './routers/episodesRouter.js';
import cookieParser from 'cookie-parser';

interface ServerError {
  log: string;
  status: number;
  message: {
    err: string;
  };
}

const app = express();
const port = 44000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// unsure if I can do this with vite, just reroute them to the vite server?
// app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.use('/user', userRouter);
app.use('/episodes', episodesRouter);

// Handle request to unknown endpoints
app.use('/', (req: Request, res: Response): Response => {
  return res.status(404).json({ error: 'Endpoint does no exist...' });
});

//Global Error Handler
app.use(
  (
    err: ServerError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response => {
    const defaultErr: ServerError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An Error Occurred' },
    };
    const errorObj: ServerError = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  },
);

app.listen(port, (): void => {
  console.log(`Listening on port: http://localhost:44000`);
});
