import React, { FC } from 'react';

//backup list, get an error if the any type is not used.

const SpecifySeries = ({
  setExcludedseries,
  excludedSeries,
  setIncludedSeriesList,
  includedSeriesList,
  dbSeriesList,
}) => {
  const handleChecked = (checked: boolean, series: string) => {
    if (!checked) {
      setExcludedseries([...excludedSeries, series]);
      setIncludedSeriesList(includedSeriesList.filter(s => s != series));
    } else {
      setExcludedseries(excludedSeries.filter(s => s != series));
      setIncludedSeriesList([...includedSeriesList, series]);
    }
  };

  return (
    <div className='dropdown dropdown-bottom'>
      <div tabIndex={0} className='btn'>
        Series
      </div>
      <ul
        tabIndex={0}
        className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
        {dbSeriesList.map((series: string, index: number) => {
          return (
            <li key={`${index}+${series}`}>
              <label className='label curser-pointer'>
                <span id={`${series}`}>{series}</span>
                <input
                  type='checkbox'
                  className='checkbox'
                  value={series}
                  defaultChecked
                  onChange={e => {
                    handleChecked(e.target.checked, e.target.value);
                  }}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SpecifySeries;
