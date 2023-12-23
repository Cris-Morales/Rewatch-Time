import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchPlaylist from '../fetchPlaylist';
const marceline: string = 'assets/Marceline.png';
const FinnJakeRelax: string = 'assets/FinnJakeRelax.png';
const bmo: string = 'arcs/BMO.webp';

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

  // onChange={e => {
  //   setFinale(e.target.checked);
  //   if (e.target.checked) {
  //     setPlaylistTime(playlistTime + 44);
  //   } else {
  //     setPlaylistTime(playlistTime - 44);
  //   }
  // }}
  // onChange={e => {
  //   let newLength: number = e.target.valueAsNumber;
  //   setPlaylistLength(newLength);
  //   setPlaylistTime(newLength * 11 + (finale ? 44 : 0));
  // }}
  // Watchtime: {playlistTime} Minutes

  return (
    <div className=' bottom-0 left-0 w-screen  bg-blue-950 text-black flex flex-col justify-evenly items-center h-section border-2 border-solid border-red-600 font-thunderman'>
      <div className='flex justify-center items-center h-fit'>
        <img src={marceline} width='600px' className='mr-10' />
        <div className='flex flex-col items-center'>
          <form
            id='generator'
            className='h-96 w-96 bg-white p-5 flex flex-col rounded-3xl'>
            <div className='flex justify-between items-center'>
              <label>Max Playlist Length</label>
              <input
                className='input input-bordered text-white text-center w-1/4 rounded text-align pt-1.5 pr-3'
                id='playlistLength'
                type='number'
                form='generator'
                max='280'
                min='0'
              />
              <p>episodes</p>
            </div>
            <div className='flex items-center '>
              <label>Include Finale</label>
              <input
                type='checkbox'
                id='finale'
                className='my-2 ml-4  checkbox bg bg-gray-800'
                onChange={e => {
                  setFinale(e.target.checked);
                }}></input>
            </div>
            <div>
              <label>Include/Exclude Arcs</label>
            </div>
            <div>
              <label>Include Watched Episodes</label>
            </div>
            <div>
              <label>Random or from watched episode</label>
            </div>
            <div>
              <label>Include/Exclude Seasons</label>
            </div>
          </form>
          <button
            className='navbar-button self-center text-white'
            type='submit'
            form='generator'
            value='Submit'
            onClick={handleSubmit}>
            Generate Playlist
            {/* change to get new playlist after the initial playlist is gotten */}
          </button>
        </div>
        <img src={FinnJakeRelax} width='600px' className='ml-10' />
      </div>
      {
        showPlaylist ? <Carousel playlist={playlist} /> : null
        // <div className='flex h-card w-screen justify-center items-center z-10'></div>
      }
      {/* ^ I want it to slide or fade into the div. */}
    </div>
  );
};

export default Generator;
