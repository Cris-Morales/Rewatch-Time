import React, { FC } from 'react';
import SpecifySeries from './SpecifySeries';
import SpecifySeason from './SpecifySeason';

const SeriesForm = ({ seriesList, seasonSeries, setFinale }) => {
  return (
    <div className='flex my-2 items-center'>
      <SpecifySeries seriesList={seriesList} />
      <div id='specify series' className='m-2 flex'>
        <div className='dropdown dropdown-left'></div>
        <label className='btn rounded-box label mx-2 flex items-center justify-center cursor-pointer'>
          <span className='mr-2'>Include Finale</span>
          <input
            type='checkbox'
            className='checkbox border-1 border-black'
            onChange={e => {
              setFinale(e.target.checked);
            }}
          />
        </label>
      </div>
      <SpecifySeason seasonSeries={seasonSeries} />
    </div>
  );
};

export default SeriesForm;
