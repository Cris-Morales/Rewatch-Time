import React from 'react';
import { Link } from 'react-scroll';
const finnAndJake: string = '../../assets/FinnJakeFistBump.png';
const banner: string = '../../assets/homeBackground.jpg';

const Home = (): JSX.Element => {
  return (
    <div
      className='flex justify-center h-section bg-blue-950'
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent 80%, rgb(23 37 84) 90%, rgb(23 37 84) 0%), url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '15% 85%',
      }}>
      {/* <div className='flex justify-center items-center bg-gray-200 bg-opacity-95 w-3/5'> */}
      <div className='flex flex-col justify-center items-center backdrop-blur-xl w-3/5 h-subsection'>
        <div className='font-thunderman text-7xl mt-20'>Welcome!</div>
        <div className='flex justify-center items-center'>
          <img
            className='mt-10 mb-10 mx-auto'
            width='500px'
            height='auto'
            src={finnAndJake}
          />
          <div className='mt-5 mb-10 mr-10 ml-10 bg-white px-5 py-5 w-96 rounded-3xl font-thunderman'>
            Adventure Time is a show about a boy named Finn, his best friend
            Jake and their adventures in the land of Ooo. It aired on Cartoon
            Network from 2010 to 2018, with an additional miniseries, "Distant
            Lands", and a spin-off series "Fionna and Cake" released in 2020 and
            2023 respectively. This app generates a random, or chronological
            playlist for rewatch sessions, for old fans or strangely chaotic new
            ones.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
