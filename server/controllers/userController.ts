import { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../db/model.js';
import { comparePasswords, hashPassword, createJWT } from '../utils/auth.js';
import jwt from 'jsonwebtoken';

import { UserController } from '../types/controllerTypes.js'

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
      const user: any = results.rows[0]; // responses

      const token = await createJWT(user);
      res.locals.user = user;
      res.locals.token = token;
      next();
    } catch (error) {
      console.error('Error in createNewUser: ', error);
      return next(error);
    }
  },
  initializeWatchList: async (req, res, next) => {
    try {
      const { episodeList } = res.locals;
      const userID = res.locals.user.id;

      for (const episode of episodeList) {
        const results: any = await query(
          'INSERT INTO users_episodes_watched(user_id, episode_id) VALUES($1, $2)',
          [userID, episode.episode_id],
        );
        console.log('episode: ', episode.episode_id, 'inserted');
      }
      next();
    } catch (error) {
      console.error('Error in initializeWatchList: ', error);
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
      console.error('Error in loginUser: ', error);
      return next(error);
    }
  },
  getUsername: async (req, res, next) => {
    // technically not needed, but I want the jwt to pass credentials not give info
    try {
      const { id, username } = res.locals.userData;
      res.locals.user = { username };
      next();
    } catch (error) {
      console.error('Error in getUsername: ', error);
      return next(error);
    }
  },
  isLoggedIn: async (req, res, next) => {
    try {
      const { id } = res.locals.userData;
      res.locals.user = { id };
      next();
    } catch (error) {
      console.error('Error in isLoggedIn: ', error);
      return next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      // does payload user_id match the delete request user_id
      const { username, password } = req.body; // credentials from req body
      const { id } = res.locals.userData; // user ID from jwt payload


      const findUserQuery = {
        text: 'SELECT id, username, password FROM users WHERE username = $1',
        values: [username],
      };

      const results: any = await query(
        findUserQuery.text,
        findUserQuery.values,
      );
      const user = results.rows[0];

      const deleteUserQuery1 = {
        text: 'DELETE FROM users_episodes_watched WHERE user_id = $1',
        values: [id],
      };

      const deleteUserQuery2 = {
        text: 'DELETE FROM users WHERE id = $1',
        values: [id],
      };

      // senario 1: not trusting the frontend, we check if the user id matched the jwt id
      // return 401,
      if (id != user.id) {
        console.log('user id does not match request id for deletion');
        return res.status(401).json({ message: 'not authorized' });
      }

      // senario 2: password is wrong
      // return 401
      const isValid = await comparePasswords(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: 'not authorized' });
      }

      // senario 3: user_id matched, password is correct, this is the user and they want to delete their account
      // query to delete this user using the token's id
      await query(deleteUserQuery1.text, deleteUserQuery1.values);
      await query(deleteUserQuery2.text, deleteUserQuery2.values);

      next();
    } catch (error) {
      console.error('Error in deleteUser: ', error);
      return next(error);
    }
  },
  updateUserIcon: async (req, res, next) => {
    try {
      const { id } = res.locals.userData;
      const { iconPath } = req.body

      const updateIconQuery = {
        text: 'UPDATE users SET userIcon = $1 WHERE id = $2 ',
        values: [iconPath, id],
      };

      await query(updateIconQuery.text, updateIconQuery.values);

      next();
    } catch (error) {
      console.error('Error in updateUserIcon: ', error);
      return next(error);
    }
  },
  getUserIcon: async (req, res, next) => {
    try {
      const { id } = res.locals.userData;

      const updateIconQuery = {
        text: 'SELECT userIcon FROM users WHERE id = $1',
        values: [id],
      };

      const results: any = await query(
        updateIconQuery.text,
        updateIconQuery.values,
      );

      res.locals.userIcon = results.rows[0];
      next();
    } catch (error) {
      console.error('Error in getUserIcon: ', error);
      return next(error);
    }
  },
  rememberUser: async (req, res, next) => {
    try {
      const expirationDate = req.body.remember
        ? new Date(new Date().getTime() + 31 * 24 * 60 * 60 * 1000)
        : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

      res.locals.expirationDate = expirationDate
      next()
    } catch (error) {
      console.error('Error in rememberUser: ', error)
      return next(error)
    }
  }
};

export default userController;
