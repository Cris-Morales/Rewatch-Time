import React, { FC } from 'react';

const backupSeasonList: any = {
  Main: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'Distant Lands': [1],
  'Fionna and Cake': [1, 2],
};

const SpecifySeason = ({ includedSeriesList }) => {
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
            <div className='collapse'>
              <input type='radio' name={`${series}`} checked />
              <div className='collapse-title shadow'>{series}</div>
              <div className='collapse-content'>
                <ul className='rounded-box'>
                  {backupSeasonList[series].map(season => {
                    return (
                      <li className='w-full btn'>
                        <label className='label curser-pointer'>
                          <span className=''>Season {season}</span>
                          <input
                            type='checkbox'
                            className='ml-2 checkbox'
                            defaultChecked></input>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </ul>
      {/* <ul
        tabIndex={0}
        className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'></ul> */}
    </div>
  );
};

//
{
  <ul
    tabIndex={0}
    className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
    {backupSeasonList.Main.map(series => {
      return (
        <li>
          <label className='label curser-pointer'>
            <span>{series}</span>
            <input type='checkbox' className='checkbox' defaultChecked></input>
          </label>
        </li>
      );
    })}
  </ul>;
}

export default SpecifySeason;
