import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
const jakeRead: string = '../../assets/jake_read.png';

const Navbar = (): JSX.Element => {
  return (
    <div className='bottom-0 left-0 w-screen h-52 m-0 flex justify-center items-center bg-blue-950 text-white shadow'>
      <div className='flex items-center'>
        <img src={jakeRead} className='h-36 w-auto mr-10 mt-10' />
        <div className='flex flex-col justify-center'>
          <p>Created by Cristian Morales | MIT License</p>
          <p>
            Adventure Time Characters and Images are © 2023 Cartoon Network
            Studios
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
