import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeasonList } from '../../fetchFormLists';
import { seasonsRow } from '../../APIResponseTypes';

const SpecifySeason = ({
  includedSeriesList,
  excludedSeasons,
  setExcludedSeasons,
}) => {
  const seasonListResults = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasonList,
  });

  // const dbSeasonsList: seasonsRow[] =
  //   seasonListResults?.data ?? backupSeasonList;
  const dbSeasonsList: any = seasonListResults?.data ?? [];

  const handleChecked = (checked: boolean, season_id: string) => {
    if (!checked) {
      setExcludedSeasons([...excludedSeasons, season_id]);
    } else {
      setExcludedSeasons(excludedSeasons.filter(s => s != season_id));
    }
  };

  return (
    <div className='dropdown dropdown-down mx-2 rounded-box'>
      <div tabIndex={0} className='btn'>
        Seasons
      </div>
      <ul
        tabIndex={0}
        className={`block overflow-y-scroll p-2 shadow dropdown-content z-[1] bg-base-100 rounded-box ${
          includedSeriesList.length ? 'h-72' : 'h-36'
        } w-52`}>
        {includedSeriesList.length ? (
          includedSeriesList.map(series => {
            return (
              <div key={`${series}`}>
                <div className='collapse-title shadow'>{series}</div>
                <ul className='rounded-box'>
                  {dbSeasonsList.map((season, index) => {
                    if (season.series_name === series) {
                      return (
                        <li
                          key={`${series} + ${season} + ${index}`}
                          className='w-full btn'>
                          <label className='label curser-pointer'>
                            <span className=''>
                              Season {season.season_number}
                            </span>
                            <input
                              type='checkbox'
                              className='ml-2 checkbox'
                              value={season.season_id}
                              defaultChecked
                              onChange={e => {
                                handleChecked(e.target.checked, e.target.value);
                              }}></input>
                          </label>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          })
        ) : (
          <img
            src='assets/jake404.png'
            alt='No Seasons Selected'
            className='self-center justify-center'
          />
        )}
      </ul>
    </div>
  );
};

export default SpecifySeason;
