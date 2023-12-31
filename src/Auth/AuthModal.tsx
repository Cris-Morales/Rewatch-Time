import React from 'react';

const AuthModal = ({ showModal, setShowModal }): JSX.Element => {
  return (
    <div className='flex flex-col justify-between pointer-events-auto font-thunderman rounded-3xl bg-blue-950 text-white w-authModal p-5 h-1/2 bg-opacity-90'>
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
      <div className='flex justify-center mb-20'>
        <div className='mx-10 text-3xl'>Log In</div>
      </div>
      <div>
        <div className='flex flex-col w-full justify-between items-center mb-2'>
          <label className=''>Username</label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            className='w-1/2 bg-gray-500 rounded-lg h-12 px-5 text-lg'></input>
        </div>
        <div className='flex flex-col w-full justify-between items-center'>
          <label>Password</label>
          <input
            name='password'
            type='password'
            id='password'
            placeholder='Password'
            className='h-12 w-1/2 bg-gray-500 rounded-lg px-5 text-lg'></input>
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='auth-event-login '>Log In</button>
      </div>
    </div>
  );
};

export default AuthModal;
