import React from 'react';

//backup list, get an error if the any type is not used.

const SpecifySeries = ({
  setExcludedSeries,
  excludedSeries,
  setIncludedSeriesList,
  includedSeriesList,
  dbSeriesList,
}) => {
  const handleChecked = (checked: boolean, series: string) => {
    if (!checked) {
      setExcludedSeries([...excludedSeries, series]);
      setIncludedSeriesList(includedSeriesList.filter(s => s != series));
    } else {
      setExcludedSeries(excludedSeries.filter(s => s != series));
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
        {dbSeriesList.map((series, index: number) => {
          return (
            <li key={`${index}+${series.series_name}`}>
              <label className='label curser-pointer'>
                <span>{series.series_name}</span>
                <input
                  type='checkbox'
                  className='checkbox'
                  value={series.series_id}
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
