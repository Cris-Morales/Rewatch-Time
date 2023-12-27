import React, { FC } from 'react';
import SpecifySeries from './SpecifySeries';
import SpecifySeason from './SpecifySeason';
import ArcsForm from './ArcsForm';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeriesList } from '../../fetchFormLists';

const seriesList: any = ['Main', 'Distant Lands', 'Fionna and Cake'];

const SeriesForm = ({ arcs, setExcludedseries, excludedSeries }) => {
  const seriesListResults = useQuery({
    queryKey: ['series'],
    queryFn: fetchSeriesList,
  });

  const dbSeriesList: string[] = seriesListResults?.data ?? seriesList;

  const [includedSeriesList, setIncludedSeriesList] =
    useState<string[]>(dbSeriesList);

  return (
    <div className='flex my-2 items-center'>
      <SpecifySeries
        setExcludedseries={setExcludedseries}
        excludedSeries={excludedSeries}
        includedSeriesList={includedSeriesList}
        setIncludedSeriesList={setIncludedSeriesList}
        dbSeriesList={dbSeriesList}
      />
      <div id='specify series' className='mx-2 flex'>
        <div className='dropdown dropdown-left'></div>
        {/* <label className='btn rounded-box label flex items-center justify-center cursor-pointer'>
          <span className=''>Include Finale</span>
          <input
            type='checkbox'
            className='checkbox border-1 border-black'
            onChange={e => {
              setFinale(e.target.checked);
            }}
          />
        </label> */}
      </div>
      <SpecifySeason includedSeriesList={includedSeriesList} />
      <ArcsForm arcs={arcs} />
    </div>
  );
};

export default SeriesForm;
