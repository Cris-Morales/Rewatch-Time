import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import e from 'express';
import fetchPlaylist from '../fetchPlaylist';

// need playlist interface

const Generator = (): JSX.Element => {
  const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [playlist, setPlaylist] = useState<any>([]);

  const playlistQuery = useQuery({
    queryKey: ['genPlaylist', playlistLength],
    queryFn: fetchPlaylist,
    enabled: false,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('pl length: ', playlistLength);
    const result = await playlistQuery.refetch();
    console.log(result?.data);
  };

  return (
    <div className='genForm'>
      form
      <form id='generator'>
        {/* Form */}
        <label>Playlist Length</label>
        <input
          id='playlistLength'
          type='number'
          form='generator'
          max='280'
          min='0'
          onChange={e => {
            let newLength: number = e.target.valueAsNumber;
            setPlaylistLength(newLength);
          }}></input>
        <button
          type='submit'
          form='generator'
          value='Submit'
          onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {/* check state, show if true */}
      <Carousel playlistLength={playlistLength} />
    </div>
  );
};

export default Generator;
