import React from 'react';
import { Link } from 'react-scroll';
const finnAndJake: string = '../../assets/FinnJakeFistBump.png';
const banner: string = '../../assets/homeBackground.jpg';

const Home = (): JSX.Element => {
  return (
    <div
      className='flex justify-center h-section'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '25% 85%',
      }}>
      <div className='flex justify-center items-center bg-gray-200 bg-opacity-95 w-3/5'>
        <div className='flex justify-center items-center mt-20'>
          <img
            className='mt-10 mb-10 mx-auto'
            width='500px'
            height='auto'
            src={finnAndJake}
          />
          <p className='h-50 w-80 mt-10 mb-10 mr-10 ml-10'>
            Adventure Time is a show about a boy named Finn, his best friend
            Jake and their adventures in the land of Ooo. It was aired on
            Cartoon Network from 2010 to 2018, with an additional miniseries,
            "Distant Lands", and a spin-off series "Fionna and Cake". This app
            generates a random, or chronological playlist for rewatch sessions,
            for either old fans or strangely chaotic new ones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
