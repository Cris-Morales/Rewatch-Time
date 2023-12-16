import React from 'react';

const authModal = (): JSX.Element => {
  return (
    <div className='fixed top-0 left-0 w-screen h-20 m-0 flex justify-between bg-blue-950 text-white shadow-md z-10'>
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

export default authModal;
