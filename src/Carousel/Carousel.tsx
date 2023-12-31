import React, { FC } from 'react';
import EpisodeCard from '../EpisodeCards/EpisodeCards';

interface carouselProps {
  playlist: episodeCardProps[];
}
interface episodeCardProps {
  episode_id: number;
  airdate: string;
  arcs: string[];
  episode_card_path: string;
  episode_number: number;
  season_number: number;
  season_id: number;
  season_episode: number;
  series: string[];
  synopsis: string;
  title: string;
}

const Carousel = ({ playlist }) => {
  return (
    // props
    <div className='flex overflow-auto h-card w-carousel shadow-lg rounded-lg'>
      {playlist.map(epiCard => {
        return (
          <div key={epiCard.episode_id + epiCard.title}>
            <EpisodeCard episode={epiCard} />
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
