import { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../db/model.js';
import { hashPassword } from '../utils/auth.js';
import { createJWT } from '../utils/auth.js';

interface UserController {
  createNewUser: (req: Request, res: Response, next: NextFunction) => void;
}

const userController: UserController = {
  createNewUser: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const userQuery = {
        text: 'INSERT INTO users(username, password) VALUES($1, $2)',
        values: [username, await hashPassword(password)],
      };

      const results: any = await query(userQuery.text, userQuery.values);
      const user = results.rows;

      const token = createJWT(user);
      res.json({ token: token });
    } catch (error) {
      console.error('Error in createNewUser: ', error);
      return next(error);
    }
  },
};

export default userController;
