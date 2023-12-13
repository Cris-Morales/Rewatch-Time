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
    <div className='epiCard'>
      <div>
        <h3>{title}</h3>
        <div>
          <p>
            Series: {series.join(', ')}
            <br />
            Season {season_number}, Episode {season_episode}
            <br />
            Overall Episode {episode_number}
            <br />
          </p>
          <div className='episodeButts'>
            <button>Watched</button>
            <button>Skipped</button>
          </div>
          <img className='episodeCardImg' alt={title} src={episode_card_path} />
          <h4>Synopsis</h4>
          <p>
            {synopsis}
            <br />
          </p>
          <h4>Arcs</h4>
          <p>{arcs.length ? arcs.join(', ') : 'None'}</p>
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
