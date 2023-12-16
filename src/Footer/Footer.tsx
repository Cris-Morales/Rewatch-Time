import React from 'react';
import { Link } from 'react-scroll'; // auto scroll user
const jakeRead: string = '../../assets/jake_read.png';
const footerSnail: string = '../assets/FooterSnail.png';

const Footer = (): JSX.Element => {
  return (
    <div className='bottom-0 left-0 w-screen h-52 m-0 flex justify-between items-center bg-blue-950 text-white shadow'>
      <div className='flex items-center w-full justify-center'>
        <img src={jakeRead} className='h-36 w-auto mr-10 mt-10' />
        <div className='flex flex-col justify-center'>
          <div>
            <div className='flex items-center'>
              <p>Built by Cristian Morales</p>
              <a
                href='https://github.com/Cris-Morales'
                className='ml-3 mb-3 mt-3'>
                <img
                  src='assets/contactIcons/github-mark-white.png'
                  width='34'
                  height='34'
                />
              </a>
              <a
                href='https://www.linkedin.com/in/cris-morales/'
                className='ml-3 mb-3 mt-3 mr-3'>
                <img
                  src='assets/contactIcons/In-White-128.png'
                  width='34'
                  height='34'
                />
              </a>
            </div>
            <div className='flex items-center'>
              <p>Special Thanks to Ashlee Peterson, UI/UX Designer</p>
              <a
                href='https://www.behance.net/ashleepeterson1'
                className='ml-3 mb-3 mt-3'>
                <img
                  src='assets/contactIcons/behance.png'
                  width='34'
                  height='34'
                />
              </a>
              <a
                href='https://www.linkedin.com/in/ashlee-h-peterson2023/'
                className='ml-3 mb-3 mt-3 mr-3'>
                <img
                  src='assets/contactIcons/In-White-128.png'
                  width='34'
                  height='34'
                />
              </a>
            </div>
            <div className='flex items-center'>
              Project Repository
              <a
                href='https://github.com/Cris-Morales/AdventureTimeRewatch.git'
                className='ml-3 mb-3 mt-3'>
                <img
                  src='assets/contactIcons/github-mark-white.png'
                  width='34'
                  height='34'
                />
              </a>
            </div>
            Adventure Time Characters and Images are © 2023 Cartoon Network
            Studios
          </div>
        </div>
      </div>
      <img src={footerSnail} className='h-28 mr-4 mt-16'></img>
    </div>
  );
};

export default Footer;
