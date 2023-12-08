import React from 'react';
import EpisodeCard from '../EpisodeCards/EpisodeCards';

interface carouselProps {
  playlistLength: number;
}

const Carousel = ({ playlistLength }): JSX.Element => {
  return (
    // props
    <div className='carousel'>
      carousel
      {/* an array of cards*/}
      <EpisodeCard />
    </div>
  );
};

export default Carousel;
