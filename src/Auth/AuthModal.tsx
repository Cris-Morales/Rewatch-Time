import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
const FinnJakeRelax: string = 'assets/FinnJakeRelax.png';

async function signUp(username: string, password: string) {
  const response = await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Failed on sign up request');
  }

  return response.json();
}

const AuthModal = ({
  showModal,
  setShowModal,
  authMode,
  setAuthMode,
  setLoggedIn,
}): JSX.Element => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const usernameValue = usernameRef.current?.value || '';
    const passwordValue = passwordRef.current?.value || '';

    try {
      const res = await fetch(`/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
      });

      const data = res.json();

      console.log(data);
      return;
    } catch (error) {
      throw new Error(`Aw buns, cards fetch not ok`);
    }
    // setShowModal(false);
  };

  return (
    <div className='flex flex-col pointer-events-auto font-thunderman rounded-3xl bg-blue-950 text-white w-authModal p-5 h-2/3 bg-opacity-90'>
      <div className='flex justify-end items-end justify-self-start'>
        <button
          className='close-modal-button'
          onClick={() => setShowModal(false)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='black'
            className='w-5 h-15 rounded-full'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <div className='flex flex-col justify-center h-2/5 mb-5'>
        <div className='mx-10 text-3xl'>{authMode ? 'Log In' : 'Sign Up'}</div>
        <img src={FinnJakeRelax} className='object-scale-down h-3/4' />
        <div className='text-center'>
          Keep track of your watched episodes and favorites!
        </div>
      </div>
      <form className='' onSubmit={handleSubmit}>
        <div className='flex flex-col w-full justify-between items-center mb-2'>
          <label className=''>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            ref={usernameRef}
            className='w-1/2 bg-gray-500 rounded-lg h-12 px-5 text-lg'
          />
        </div>
        <div className='flex flex-col w-full justify-between items-center'>
          <label>Password</label>
          <input
            name='password'
            type='password'
            id='password'
            placeholder='Password'
            ref={passwordRef}
            className='h-12 w-1/2 bg-gray-500 rounded-lg px-5 text-lg'
          />
        </div>
        <div className='flex flex-col justify-center items-center mt-5'>
          <button
            className={`${
              authMode ? 'auth-login-submit' : 'auth-signup-submit'
            }`}
            typeof='submit'
            onClick={handleSubmit}>
            {authMode ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </form>
      <div className='flex justify-center mt-5'>
        <a>
          {authMode ? "Don't have an account? " : 'Already have an account? '}{' '}
          <button
            onClick={() => {
              setAuthMode(!authMode);
            }}>
            {authMode ? 'Sign Up' : 'Log In'}
          </button>
        </a>
      </div>
    </div>
  );
};

export default AuthModal;
