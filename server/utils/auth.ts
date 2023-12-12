import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
  return token;
};

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const bearer = req.headers.authorization;

  console.log('authorizing');
  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = user;
    next();
  } catch (error) {
    console.error('error in authorization: ', error);
    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }
};
