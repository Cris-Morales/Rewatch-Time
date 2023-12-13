import React, { FC } from 'react';
import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchEpisodeCards from '../fetchPlaylist.ts';
import { episodeCard } from '../APIResponseTypes.ts';

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

  return (
    <div className='flex flex-col items-center text-center h-fit w-96'>
      <div>
        <h3>{title}</h3>
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
          <img
            className='h-auto object-cover w-72'
            alt={title}
            src={episode_card_path}
          />
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
      </div>
      <div className='flex w-full justify-center'>
        <button className='navbar-button'>Move Up</button>
        <button className='navbar-button'>Down Up</button>
      </div>
    </div>
  );
};

export default EpisodeCard;
