import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
import { useState } from 'react';
import { isLoggedIn } from '../authQueries';
import { useQuery } from '@tanstack/react-query';
import PreLoginNav from '../Auth/PreLoginNav';
import PostLoginNav from '../Auth/PostLoginNav';
const title: string = '../../assets/logo.png';
const home: string = '../../assets/TreeFortHomeButton.png';

const Navbar = ({
  showModal,
  setShowModal,
  authMode,
  setAuthMode,
  loggedInBool,
  loggedInQuery,
}): JSX.Element => {
  return (
    <div className='fixed top-0 left-0 w-screen h-28 flex justify-between items-center bg-blue-950 text-white shadow-md z-20'>
      <div className='h-full ml-8 w-1/4 flex justify-end items-center rounded-full'>
        <img src={title} className='h-20 rounded-full' />
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
        {loggedInBool ? (
          <PostLoginNav loggedInQuery={loggedInQuery} />
        ) : (
          <PreLoginNav setAuthMode={setAuthMode} setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
