import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchPlaylist from '../fetchPlaylist';

// need playlist interface

const Generator = (): JSX.Element => {
  const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [playlist, setPlaylist] = useState<any>([]);
  const [finale, setFinale] = useState<boolean>(false);
  const [playlistTime, setPlaylistTime] = useState<number>(0);
  const [showPlaylist, setShowPlatlist] = useState<boolean>(false);

  const playlistQuery = useQuery({
    queryKey: ['genPlaylist', playlistLength, finale],
    queryFn: fetchPlaylist,
    enabled: false,
  });

  const handleSubmit = async e => {
    e.preventDefault();

    setShowPlatlist(true);
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
            setPlaylistTime(newLength * 11 + (finale ? 44 : 0));
          }}></input>
        <label>Include Finale</label>
        <input
          type='checkbox'
          id='finale'
          onChange={e => {
            setFinale(e.target.checked);
            if (e.target.checked) {
              setPlaylistTime(playlistTime + 44);
            } else {
              setPlaylistTime(playlistTime - 44);
            }
          }}></input>
        <button
          type='submit'
          form='generator'
          value='Submit'
          onClick={handleSubmit}>
          Generate Playlist
        </button>
        Watchtime: {playlistTime} Minutes
      </form>
      {/* check state, show if true */}
      {showPlaylist ? <Carousel playlistLength={playlistLength} /> : null}
    </div>
  );
};

export default Generator;
