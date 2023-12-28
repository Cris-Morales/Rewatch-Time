import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeasonList } from '../../fetchFormLists';
import { seasonsRow } from '../../APIResponseTypes';

const backupSeasonList: any = [
  {
    season_number: 12,
    series_name: 'Main',
    season_id: 1,
  },
  {
    season_number: 2,
    series_name: 'Main',
    season_id: 2,
  },
  {
    season_number: 3,
    series_name: 'Main',
    season_id: 3,
  },
  {
    season_number: 4,
    series_name: 'Main',
    season_id: 4,
  },
  {
    season_number: 5,
    series_name: 'Main',
    season_id: 5,
  },
  {
    season_number: 6,
    series_name: 'Main',
    season_id: 6,
  },
  {
    season_number: 7,
    series_name: 'Main',
    season_id: 7,
  },
  {
    season_number: 8,
    series_name: 'Main',
    season_id: 8,
  },
  {
    season_number: 9,
    series_name: 'Main',
    season_id: 9,
  },
  {
    season_number: 10,
    series_name: 'Main',
    season_id: 10,
  },
  {
    season_number: 1,
    series_name: 'Distant Lands',
    season_id: 11,
  },
  {
    season_number: 1,
    series_name: 'Fionna And Cake',
    season_id: 12,
  },
  {
    season_number: 2,
    series_name: 'Fionna And Cake',
    season_id: 13,
  },
];

const SpecifySeason = ({
  includedSeriesList,
  excludedSeasons,
  setExcludedSeasons,
}) => {
  const seasonListResults = useQuery({
    queryKey: ['seasons'],
    queryFn: fetchSeasonList,
  });

  const dbSeasonsList: seasonsRow[] =
    seasonListResults?.data ?? backupSeasonList;

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
        className='block overflow-y-scroll p-2 shadow dropdown-content z-[1] bg-base-100 rounded-box h-72 w-52'>
        {includedSeriesList.map(series => {
          return (
            <div key={`${series}`} className='collapse'>
              <input type='radio' name={`${series}`} checked />
              <div className='collapse-title shadow'>{series}</div>
              <div className='collapse-content'>
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
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SpecifySeason;
