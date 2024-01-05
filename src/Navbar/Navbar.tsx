import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
import { useState } from 'react';
import PreLoginNav from '../Auth/PreLoginNav';
import PostLoginNav from '../Auth/PostLoginNav';
const title: string = '../../assets/Adventure_Time_logo.png';
const home: string = '../../assets/TreeFortHomeButton.png';

const Navbar = ({
  showModal,
  setShowModal,
  authMode,
  setAuthMode,
  loggedIn,
  setLoggedIn,
}): JSX.Element => {
  return (
    <div className='fixed top-0 left-0 w-screen h-20 flex justify-between bg-blue-950 text-white shadow-md z-20'>
      <div className='h-full ml-8 w-1/4 flex justify-end items-center'>
        <img src={title} className='h-16' />
      </div>
      <div className='flex w-1/2 justify-center'>
        <button className='navbar-button'>
          Home <img src={home} className='h-16' />
        </button>
        <button className='navbar-button'>Generate Playlist</button>
        <button className='navbar-button'>User Features</button>
        <button className='navbar-button'>About This Project</button>
      </div>
      <div className='flex items-center w-1/4'>
        {loggedIn ? (
          <PostLoginNav setLoggedIn={setLoggedIn} />
        ) : (
          <PreLoginNav setAuthMode={setAuthMode} setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
