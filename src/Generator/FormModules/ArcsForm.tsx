import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchArcList } from '../../fetchFormLists';
import { arcs } from '../../APIResponseTypes';

const ArcsForm = ({ excludedArcs, setExcludedArcs }) => {
  const arcsQueryResults = useQuery({
    queryKey: ['arcs'],
    queryFn: fetchArcList,
  });

  const arcList: any = arcsQueryResults?.data ?? [];
  console.log('arcList', arcList);

  const handleChecked = (checked: boolean, arc_id: string) => {
    if (!checked) {
      setExcludedArcs([...excludedArcs, arc_id]);
    } else {
      setExcludedArcs(excludedArcs.filter(a => a != arc_id));
    }
  };

  return (
    <div className='dropdown dropdown-bottom mx-2'>
      <div tabIndex={0} className='btn'>
        Specify Arcs
      </div>
      <ul
        tabIndex={0}
        className='block overflow-y-scroll h-96 w-auto p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
        {arcList.map((arc, index) => {
          console.log(arc);
          return (
            <li key={`${arc.arc} + ${index}`} className='h-40 w-32'>
              <label className='label curser-pointer flex flex-col items-center justify center text-center'>
                <span className='flex flex-col items-center'>
                  {arc.arc}
                  <img
                    src={arc.icon_path}
                    alt={arc.arc}
                    className='h-16 w-auto rounded-box'
                  />
                </span>
                <input
                  type='checkbox'
                  className='checkbox'
                  defaultChecked
                  value={arc.arc_id}
                  onChange={e => {
                    handleChecked(e.target.checked, e.target.value);
                  }}></input>
              </label>
            </li>
          );
        })}
        <li key='uncategorized' className='h-40 w-32'>
          <label className='label curser-pointer flex flex-col items-center justify center text-center'>
            <span className='flex flex-col items-center'>
              Uncategorized
              <img
                src='/arcs/dumbRock.webp'
                alt='Uncategorized'
                className='h-16 w-auto rounded-box'
              />
            </span>
            <input
              type='checkbox'
              className='checkbox'
              defaultChecked
              value='0'
              onChange={e => {
                handleChecked(e.target.checked, e.target.value);
              }}></input>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ArcsForm;
