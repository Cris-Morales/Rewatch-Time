import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
import title from '../../assets/Adventure_Time_logo.png';

const Navbar = (): JSX.Element => {
  return (
    <div className='NavBar'>
      <img src={title} width='auto' height='55px' />
      home generate watchlist Episode List AboutThisProject Login/Logout
    </div>
  );
};

export default Navbar;
