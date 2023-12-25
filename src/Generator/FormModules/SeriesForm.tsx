import React, { FC } from 'react';
import SpecifySeries from './SpecifySeries';
import SpecifySeason from './SpecifySeason';

const SeriesForm = ({ seriesList, seasonSeries }) => {
  return (
    <div className='flex mt-2'>
      <SpecifySeries seriesList={seriesList} />
      <div id='specify series' className='m-2 flex'>
        <div className='dropdown dropdown-left'></div>
        <label className='border-2 border-black rounded-box label mx-2 flex items-center justify-center cursor-pointer'>
          <span className='mr-2'>Include Finale</span>
          <input type='checkbox' className='checkbox border-1 border-black' />
        </label>
      </div>
      <SpecifySeason seasonSeries={seasonSeries} />
    </div>
  );
};

export default SeriesForm;
