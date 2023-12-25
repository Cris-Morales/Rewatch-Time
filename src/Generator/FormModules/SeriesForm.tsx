import React, { FC } from 'react';
import SpecifySeries from './SpecifySeries';
import SpecifySeason from './SpecifySeason';
import ArcsForm from './ArcsForm';

const SeriesForm = ({ seriesList, seasonSeries, setFinale, arcs }) => {
  return (
    <div className='flex my-2 items-center'>
      <SpecifySeries seriesList={seriesList} />
      <div id='specify series' className='mx-2 flex'>
        <div className='dropdown dropdown-left'></div>
        <label className='btn rounded-box label flex items-center justify-center cursor-pointer'>
          <span className=''>Include Finale</span>
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
      <ArcsForm arcs={arcs} />
    </div>
  );
};

export default SeriesForm;
