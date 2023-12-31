import React from 'react';

const AuthModal = ({ showModal, setShowModal }): JSX.Element => {
  return (
    <div className='h-2/5 w-auto flex flex-col justify-center bg-white font-thunderman'>
      <button className='btn'>Close</button>
      <div className='flex'>
        <div id='auth' className='flex flex-col ml-10 mr-10'>
          <label className='text-center'>Login/Signup</label>
          <div className='flex justify-between mb-1'>
            <label className='mr-5'>Username</label>
            <input type='text' id='username' className=' bg-gray-500'></input>
          </div>
          <div className='flex justify-between'>
            <label>Password</label>
            <input
              name='password'
              type='password'
              id='password'
              className='bg-gray-500'></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
