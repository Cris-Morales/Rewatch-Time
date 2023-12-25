import React, { FC } from 'react';

const SpecifySeason = ({ seasonSeries }) => {
  return (
    <div className='dropdown dropdown-right'>
      <div tabIndex={0} className='btn'>
        Specify Season
      </div>
      <ul
        tabIndex={0}
        className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
        {seasonSeries.Main.map(series => {
          return (
            <li>
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

export default SpecifySeason;
