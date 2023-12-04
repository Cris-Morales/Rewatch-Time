import React from 'react';
import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchEpisodeCards from '../fetchEpisodeCards.ts';
import { episodeCard } from '../APIResponseTypes.ts';

const EpisodeCard = (): JSX.Element => {
  // passed in props from the container, from the carousel
  // from the form

  // const results = useQuery({ queryFn: () => fetchEpisodeCards, queryKey: [1] });

  const handleClick = async (): void => {
    const results = await fetch('/api/');
    const data = await results.json();
    console.log(data);
  };

  return (
    <div className='epiCard'>
      Episode Card
      <div>
        <div className='episodeButts'>
          <button onClick={handleClick}>Fetch</button>
          <button>Skipped</button>
        </div>
        <div>
          {/* card data */}
          <img
            className='episodeCardImg'
            src='/episodeCards/1 - 4tQWQF3 - S01E01 - Slumber Party Panic.jpg'
            alt='Slumber Party Panic'
          />
        </div>
      </div>
      <div className='orderButts'>
        <button>Move Up</button>
        <button>Down Up</button>
      </div>
    </div>
  );
};

export default EpisodeCard;
