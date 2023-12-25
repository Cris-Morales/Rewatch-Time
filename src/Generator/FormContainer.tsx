import React, { FC } from 'react';
import SeriesForm from './FormModules/SeriesForm.tsx';
import ArcsForm from './FormModules/ArcsForm.tsx';
import SelectWatchedForm from './FormModules/SelectWatchedForm.tsx';

const FormContainer = ({ seriesList, arcs, seasonSeries }) => {
  return (
    <div
      id='generator'
      className='text-black h-fit w-generatorForm bg-white p-5 flex flex-col rounded-3xl items-center shadow-lg'>
      <div className='my-1 mx- w-full flex items-center justify-between'>
        <h3 className=' text-2xl'>Playlist Generator</h3>
        <p>Is Logged In: false</p>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer flex justify-center'>
          <span className='mr-2 text-center'>Randomized Playlist</span>
          <input type='checkbox' className='toggle' />
          <span className='text-center ml-2'>
            Chronologically from Watched Episode
          </span>
        </label>
      </div>
      <div className='flex justify-center items-center'>
        <label className='mr-2'>Max Playlist Length</label>
        <div className='flex items-center'>
          <input
            className='mr-2 input input-bordered text-center w-1/4 rounded text-align pt-1.5 pr-3'
            id='playlistLength'
            type='number'
            form='generator'
            max='280'
            min='0'
            defaultValue={1}
          />
          <p className=''>episodes</p>
        </div>
      </div>
      <SeriesForm seriesList={seriesList} seasonSeries={seasonSeries} />
      <ArcsForm arcs={arcs} />
      <SelectWatchedForm />
    </div>
  );
};

export default FormContainer;
