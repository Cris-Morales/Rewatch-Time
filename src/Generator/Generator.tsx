import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchPlaylist from '../fetchPlaylist';
const marceline: string = 'assets/Marceline.png';
const FinnJakeRelax: string = 'assets/FinnJakeRelax.png';

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

    const result = await playlistQuery.refetch();
    setPlaylist(result?.data);
    setShowPlatlist(true);
  };

  return (
    <div className='bottom-0 left-0 w-screen  bg-blue-950 text-white flex flex-col justify-center items-center h-screen'>
      <div className='flex justify-center items-center'>
        <img src={marceline} width='600px' className='mr-10' />
        <div>
          <form id='generator' className='h-96 w-96 bg-gray-500'>
            <label>Playlist Length</label>
            <input
              className='text-black'
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
            Watchtime: {playlistTime} Minutes
          </form>
          <button
            className='navbar-button'
            type='submit'
            form='generator'
            value='Submit'
            onClick={handleSubmit}>
            Generate Playlist
          </button>
        </div>
        <img src={FinnJakeRelax} width='600px' className='ml-10' />
      </div>
      {showPlaylist ? <Carousel playlist={playlist} /> : null}
    </div>
  );
};

export default Generator;
