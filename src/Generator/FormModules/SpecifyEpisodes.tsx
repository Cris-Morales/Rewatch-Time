import React, { useState, FC } from 'react';

const SpecifyEpisodes = (): JSX.Element => {
  return (
    <div id='specify episodes' className='m-2 flex justify-center items-center'>
      <h3 className='text-center my-2'>Specify Episodes: </h3>
      <div className='flex justify-center items-center my-2'>
        <label className='mx-2'>All</label>
        <input
          type='radio'
          name='radio-1'
          className='radio border-1 border-black'
          defaultChecked
        />
        <label className='mx-2'>Watched</label>
        <input
          type='radio'
          name='radio-1'
          className='radio border-1 border-black'
        />
        <label className='mx-2'>Unwatched</label>
        <input
          type='radio'
          name='radio-1'
          className='radio border-1 border-black'
        />
      </div>
    </div>
  );
};
