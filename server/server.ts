import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import process from 'process';

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
// app.use(express.static(path.resolve(__dirname, '../client')));

// routes
app.get('/', (req: Request, res: Response): Response => {
  return res.status(200).json('test');
});

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

app.listen(44000, (): void => {
  console.log(`Listening on port: 44000`);
});