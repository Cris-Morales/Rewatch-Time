import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeasonList } from '../../fetchFormLists';
import SeasonListItem from './SeasonListItem'

const SpecifySeason = ({
  includedSeriesList,
  excludedSeasons,
  setExcludedSeasons,
  dbSeriesList
}) => {
  const seasonListResults = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasonList,
  });

  const dbSeasonsList: any = seasonListResults?.data ?? [];
  console.log(includedSeriesList, excludedSeasons, dbSeriesList, dbSeasonsList)

  return (
    <div className='dropdown dropdown-down mx-2 rounded-box'>
      <div tabIndex={0} className='btn'>
        Seasons
      </div>
      <div
        tabIndex={0}
        className={`block overflow-y-scroll p-2 shadow dropdown-content z-[1] bg-base-100 rounded-box ${includedSeriesList.length ? 'h-72' : 'h-36'
          } w-52`}>
        {includedSeriesList.length ? (
          includedSeriesList.map(series_id => {
            return (<SeasonListItem
              includedSeriesList={includedSeriesList}
              series_id={series_id}
              excludedSeasons={excludedSeasons}
              setExcludedSeasons={setExcludedSeasons}
              dbSeriesList={dbSeriesList}
              dbSeasonsList={dbSeasonsList}
            />)
          })
        ) : (
          <img
            src='assets/jake404.png'
            alt='No Seasons Selected'
            className='self-center justify-center'
          />
        )}
      </div>
    </div>
  );
};

export default SpecifySeason;