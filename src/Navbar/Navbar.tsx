import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
const title: string = '../../assets/Adventure_Time_logo.png';

const Navbar = (): JSX.Element => {
  return (
    <div className='fixed top-0 left-0 w-screen h-20 m-0 flex justify-between bg-blue-950 text-white shadow'>
      <img src={title} />

      <div className='flex'>
        <button className='navbar-button'>Home</button>
        <button className='navbar-button'>Generate Playlist</button>
        <button className='navbar-button'>Watch List</button>
        <button className='navbar-button'>Submit Changes</button>
        <button className='navbar-button'>About This Project</button>
        <div id='auth' className='flex flex-col ml-10 mr-10'>
          <label className='text-center'>Login/Signup</label>
          <div className='flex justify-between mb-1'>
            <label className='mr-5'>Username</label>
            <input typeof='text' id='username' className=' bg-gray-500'></input>
          </div>
          <div className='flex justify-between'>
            <label>Password</label>
            <input
              typeof='password'
              id='password'
              className='bg-gray-500'></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
