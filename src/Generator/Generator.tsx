import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery } from '@tanstack/react-query';
import e from 'express';
import fetchPlaylist from '../fetchPlaylist';

// need playlist interface

const Generator = (): JSX.Element => {
  const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [playlist, setPlaylist] = useState<any>([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(
      `/api/genPlaylist?playlistLength=${playlistLength}&?finale=true`,
    );

    if (!res.ok) {
      throw new Error(`Aw buns, cards fetch not ok`);
    }

    const data = await res.json();
    console.log(data);
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
      <Carousel />
    </div>
  );
};

export default Generator;
