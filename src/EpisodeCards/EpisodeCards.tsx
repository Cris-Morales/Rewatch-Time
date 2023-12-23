import React, { FC } from 'react';
import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchEpisodeCards from '../fetchPlaylist.ts';
import CardArcIconsList from './CardArcIconList.tsx';
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
      <div className='flex flex-col items-center justify-between text-center bg-white bg-opacity-80 text-black rounded-lg h-full min-w-card p-3'>
        <div className='flex w-full justify-start'>
          <button className='m-2'>W</button>
          <button className='m-2'>S</button>
          <button className='m-2'>F</button>
        </div>
        <div className='mb-5 flex flex-col justify-center items-center'>
          <h3 className='w-1/2 flex flex-wrap justify-center items-center'>
            {title.toUpperCase()}
          </h3>
          <p>
            {series.join(', ')}: S{season_number}, Ep.{season_episode} <br /> #
            {episode_number} Overall
          </p>
        </div>
        <div>
          <button className=''>Synopsis</button>
        </div>
        <div
          id='cardNavButtons'
          className='flex justify-between text-center w-full'>
          <button className=''>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3.0}
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
          <div className=''>
            <CardArcIconsList arcsList={arcs} />
          </div>
          <button className=''>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='3.0'
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
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
