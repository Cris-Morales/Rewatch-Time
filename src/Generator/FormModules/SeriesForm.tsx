import React, { FC } from 'react';
import SpecifySeries from './SpecifySeries';
import SpecifySeason from './SpecifySeason';
import ArcsForm from './ArcsForm';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeriesList } from '../../fetchFormLists';

const backupSeriesList: any = [1, 4, 5];

const SeriesForm = ({
  setExcludedSeries,
  excludedSeries,
  excludedSeasons,
  setExcludedSeasons,
  excludedArcs,
  setExcludedArcs,
}) => {
  const seriesListResults = useQuery({
    queryKey: ['series'],
    queryFn: fetchSeriesList,
  });

  const dbSeriesList: string[] = seriesListResults?.data ?? backupSeriesList;

  const [includedSeriesList, setIncludedSeriesList] =
    useState<string[]>(dbSeriesList);

  return (
    <div className='flex my-2 items-center'>
      <SpecifySeries
        setExcludedSeries={setExcludedSeries}
        excludedSeries={excludedSeries}
        includedSeriesList={includedSeriesList}
        setIncludedSeriesList={setIncludedSeriesList}
        dbSeriesList={dbSeriesList}
      />
      <div id='specify series' className='mx-2 flex'>
        <div className='dropdown dropdown-left'></div>
      </div>
      <SpecifySeason
        includedSeriesList={includedSeriesList}
        dbSeriesList={dbSeriesList}
        excludedSeasons={excludedSeasons}
        setExcludedSeasons={setExcludedSeasons}
      />
      <ArcsForm excludedArcs={excludedArcs} setExcludedArcs={setExcludedArcs} />
    </div>
  );
};

export default SeriesForm;
