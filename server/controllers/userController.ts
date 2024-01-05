import { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../db/model.js';
import { comparePasswords, hashPassword, createJWT } from '../utils/auth.js';
import jwt from 'jsonwebtoken';

interface UserController {
  createNewUser: (req: Request, res: Response, next: NextFunction) => void;
  loginUser: (req: Request, res: Response, next: NextFunction) => void;
  getUsername: (req: Request, res: Response, next: NextFunction) => void;
}

const userController: UserController = {
  createNewUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const userQuery = {
        text: 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING id, username',
        values: [username, await hashPassword(password)],
      };
      // handle if the username already exists

      const results: any = await query(userQuery.text, userQuery.values);
      const user = results.rows[0];

      const token = await createJWT(user);

      res.locals.token = token;
      next();
    } catch (error) {
      console.error('Error in createNewUser: ', error);
      return next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const findUserQuery = {
        text: 'SELECT id, username, password FROM users WHERE username = $1',
        values: [username],
      };

      const results: any = await query(
        findUserQuery.text,
        findUserQuery.values,
      );
      const user = results.rows[0];

      // senario 1: username doesn't exist
      // senario 2: password is wrong
      const isValid = await comparePasswords(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: 'Incorrect credentials.' });
      }
      const token = createJWT(user);
      res.locals.token = token;
      next();
    } catch (error) {
      console.error('Error in sign in controller: ', error);
      return next(error);
    }
  },
  getUsername: async (req, res, next) => {
    try {
      const { id, username } = res.locals.userData;
      res.locals.user = { id, username };
      next();
    } catch (error) {
      console.error('Error in getUsername: ', error);
      return next(error);
    }
  },
};

export default userController;
