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
    return res.status(401).json({ message: 'not authorized' });
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'not authorized' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = payload;
    next();
  } catch (error) {
    console.error('error in authorization: ', error);
    return res.status(401).json({ message: 'not valid token' });
  }
};