import React from 'react';
import EpisodeCard from '../EpisodeCards/EpisodeCards';

const Carousel = (): JSX.Element => {
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
