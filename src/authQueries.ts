import { QueryFunction } from '@tanstack/react-query';
import { LoginData, usernameRequest } from './APIResponseTypes';

export const signupUser = async ({ username, password }: LoginData) => {
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

  return res.json();
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

export const loginUser = async ({ username, password }: LoginData) => {
  const res = await fetch(`/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(`Error in Sign Up Request`);
  }

  return res.json();
};
