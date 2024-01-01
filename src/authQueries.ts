import { QueryFunction } from '@tanstack/react-query';
import { LoginData } from './APIResponseTypes';

export const signupUser = async ({ username, password }: LoginData) => {
  const res = await fetch(`/api/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(`Aw buns, cards fetch not ok`);
  }

  return res.json();
};
