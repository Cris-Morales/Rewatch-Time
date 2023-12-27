import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeriesList } from '../../fetchFormLists';

const SpecifySeries = ({ seriesList }) => {
  const seriesListResults = useQuery({
    queryKey: ['series'],
    queryFn: fetchSeriesList,
  });

  const dbSeriesList = seriesListResults?.data ?? [];

  console.log(dbSeriesList);

  return (
    <div className='dropdown dropdown-right'>
      <div tabIndex={0} className='btn'>
        Specify Series
      </div>
      <ul
        tabIndex={0}
        className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
        {dbSeriesList.map(series => {
          return (
            <li key={`series`}>
              <label className='label curser-pointer'>
                <span>{series}</span>
                <input
                  type='checkbox'
                  className='checkbox'
                  defaultChecked></input>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SpecifySeries;
