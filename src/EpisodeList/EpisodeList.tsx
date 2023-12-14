import React from 'react';
import { Link } from 'react-scroll';
const finnAndJake: string = '../../assets/FinnJakeFistBump.png';
const banner1: string = '../../assets/boomBoomMountainBackground.jpg';
const banner2: string = '../../assets/trainTracksBackground.jpg';

const EpisodeList = (): JSX.Element => {
  return (
    <div
      className='flex justify-center h-section'
      style={{
        backgroundImage: `url(${banner1}), url(${banner2})`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundSize: '84%, 84%',
        backgroundPosition: '-175%, 125%',
      }}>
      <div className='flex justify-center items-center bg-gray-200 w-3/5'>
        <p>Lipsum</p>
      </div>
    </div>
  );
};

export default EpisodeList;
