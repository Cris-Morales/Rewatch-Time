import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
import title from '../../assets/Adventure_Time_logo.png';

const Navbar = (): JSX.Element => {
  return (
    <div className='fiexed top-0 left-0 w-screen border'>
      <img src={title} width='auto' height='55px' />
      home generate watchlist Episode List AboutThisProject Login/Logout
    </div>
  );
};

export default Navbar;
