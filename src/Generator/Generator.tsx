import React from 'react';
import Carousel from '../Carousel/Carousel';
import query from '@tanstack/react-query';

const Generator = (): JSX.Element => {
  //

  return (
    <div className='genForm'>
      form
      <form>
        {/* Form */}
        <input typeof='submit' value='submit' />
      </form>
      {/* check state, show if true */}
      <Carousel />
    </div>
  );
};

export default Generator;
