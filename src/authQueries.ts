import { QueryFunction } from '@tanstack/react-query';
import { LoginData, usernameRequest, loginRequest } from './APIResponseTypes';

export const signupUser = async ({ username, password }: LoginData) => {
  console.log('in');
  const res = await fetch(`/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(`Error in Sign Up Request`);
  }

  return;
};

export const loginUser = async ({ username, password }: LoginData) => {
  const res = await fetch(`/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(`Error in Sign Up Request`);
  }

  return;
};

export const fetchUsername: QueryFunction<
  usernameRequest,
  ['username']
> = async () => {
  const res = await fetch('/api/user/username');

  if (!res.ok) {
    throw new Error('Error in Username Request');
  }

  return res.json();
};

export const isLoggedIn: QueryFunction<
  loginRequest,
  ['isLoggedIn']
> = async () => {
  const res = await fetch('/api/user/isLoggedIn');

  if (!res.ok) {
    throw new Error('Error in Login Request');
  }

  return res.json();
};
