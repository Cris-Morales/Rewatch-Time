import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
const title: string = '../../assets/Adventure_Time_logo.png';
const home: string = '../../assets/TreeFortHomeButton.png';

const Navbar = (): JSX.Element => {
  return (
    <div className='fixed top-0 left-0 w-screen h-20 m-0 flex justify-between bg-blue-950 text-white shadow-md z-10'>
      <img src={title} className='mt-2 mb-2 ml-5' />

      <div className='flex'>
        <button className='navbar-button font-thunderman'>
          Home <img src={home} className='h-16' />
        </button>
        <button className='navbar-button'>Generate Playlist</button>
        <button className='navbar-button'>Additional Features</button>
        <button className='navbar-button'>About This Project</button>
        <div className='auth-selector'>
          <button className='auth-event-login'>Login</button>
          <button className='auth-event-signup'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
