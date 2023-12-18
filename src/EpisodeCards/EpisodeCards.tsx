import React, { FC } from 'react';
import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchEpisodeCards from '../fetchPlaylist.ts';
import { episodeCard } from '../APIResponseTypes.ts';
const finnAndJake: string = '../../assets/FinnJakeFistBump.png';

const EpisodeCard = ({ episode }): JSX.Element => {
  const {
    title,
    season_number,
    season_episode,
    episode_number,
    episode_card_path,
    arcs,
    series,
    airdate,
    synopsis,
  } = episode;

  const bgCardImage: string = episode_card_path.replace(/\s/g, '%20');
  return (
    //  flex-col items-center text-center h-fit w-96
    <div
      className='flex flex-col items-center text-center h-card w-card font-thunderman'
      style={{
        backgroundImage: `url(${bgCardImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '25%',
      }}>
      <div className='flex flex-col items-center justify-between text-center bg-white opacity-75 text-black rounded-lg h-full p-3 w-56'>
        <div>
          <h3>{title.toUpperCase()}</h3>
          <p>
            {series.join(', ')}: S{season_number}, Ep.{season_episode} <br /> #
            {episode_number} Overall
          </p>
        </div>
        <div className='flex flex-col items-center text-center'>
          <p>
            Synopsis: <br />
            {synopsis}
          </p>
        </div>
      </div>
      {/* <div className='flex'>
        <div className='flex flex-col items-center'>
          <p>
            Series: {series.join(', ')} | Season {season_number}, Episode{' '}
            {season_episode}
            <br />
            Overall Episode {episode_number}
            <br />
          </p>
          <div className='navbar-button'>
            <button>Watched</button>
            <button>Skipped</button>
          </div>
          <div>
            <div className='flex items-center'>
              <h3>Synopsis:</h3>
              <p>{synopsis}</p>
            </div>
            <div className='flex items-center'>
              <h4>Arcs:</h4>
              <p>{arcs.length ? arcs.join(', ') : 'None'}</p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div id='cardNavButtons' className='flex w-full justify-center'>
        <button className='arrow-button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            data-slot='icon'
            className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
            />
          </svg>
        </button>
        <button className='arrow-button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            data-slot='icon'
            className='w-6 h-6'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3'
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default EpisodeCard;
