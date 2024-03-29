import React, { FC } from 'react';
import SeriesForm from './FormModules/SeriesForm.tsx';
import ArcsForm from './FormModules/ArcsForm.tsx';
import SelectWatchedForm from './FormModules/SelectWatchedForm.tsx';
import SpecifyEpisodes from './FormModules/SpecifyEpisodes.tsx';

const FormContainer = ({
  loggedInBool,
  queryType,
  setPlaylistLength,
  setExcludedSeries,
  excludedSeries,
  excludedSeasons,
  setExcludedSeasons,
  excludedArcs,
  setExcludedArcs,
}) => {
  return (
    <div
      id='generator'
      className='text-black h-fit w-generatorForm bg-white p-5 flex flex-col rounded-3xl items-center shadow-lg'>
      <div className='my-1 mx- w-full flex items-center justify-between'>
        <h3 className=' text-2xl'>Playlist Generator</h3>
        <p>
          {loggedInBool
            ? 'user icon here :3'
            : 'Log in to access all features!'}
        </p>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer flex justify-center'>
          <span className='mr-2 text-center'>Randomized Playlist</span>
          <input
            id='queryType'
            type='checkbox'
            className='toggle'
            disabled={!loggedInBool}
          />
          <span
            className={`text-center ml-2 ${
              loggedInBool ? null : 'text-gray-500'
            }`}>
            Chronologically Playlist
          </span>
        </label>
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex items-center justify-center w-full mx-5'>
          <label className='mr-2'>Max Playlist Length</label>
          <input
            className='mr-2 input input-bordered text-center w-1/4 rounded text-align pt-1.5 pr-3'
            id='playlistLength'
            type='number'
            form='generator'
            max='280'
            min='1'
            defaultValue={1}
            onChange={e => {
              let newLength: number = e.target.valueAsNumber;
              setPlaylistLength(newLength);
            }}
          />
          <p className=''>episodes</p>
        </div>
      </div>
      <SpecifyEpisodes loggedInBool={loggedInBool} />
      <SeriesForm
        setExcludedSeries={setExcludedSeries}
        excludedSeries={excludedSeries}
        excludedSeasons={excludedSeasons}
        setExcludedSeasons={setExcludedSeasons}
        excludedArcs={excludedArcs}
        setExcludedArcs={setExcludedArcs}
      />
      <SelectWatchedForm />
    </div>
  );
};

export default FormContainer;
