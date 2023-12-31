import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchPlaylist from '../fetchPlaylist';
import FormContainer from './FormContainer';
const marceline: string = 'assets/Marceline.png';
const FinnJakeRelax: string = 'assets/FinnJakeRelax.png';
const bmo: string = 'arcs/BMO.webp';

// need playlist interface

const arcs: string[] = [
  "Finn's Relationships",
  "Finn's Origin",
  "Finn's Swords",
  "Jake's Relationship",
  'Jake The Dad',
  "Jake's Power",
  'Marceline',
  'Princess Bubblegum',
  'The Ice King',
  'Simon',
  'Simon And Marcy',
  'Lemongrab',
  'Bmo',
  'Fionna And Cake',
  'The Lich',
  'Guest Animator',
  'Bubbline',
  'Magic Man',
  'Non-canon',
  'Joshua And Margaret',
  'Jermaine',
  "Finn's Arm",
  'The Ghost Lady',
  'The Catalyst Comet',
  'Uncategorized',
];

const Generator = (): JSX.Element => {
  // const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [playlist, setPlaylist] = useState<any>([]);
  const [finale, setFinale] = useState<boolean>(false);
  const [showPlaylist, setShowPlatlist] = useState<boolean>(false);
  const [excludedArcs, setExcludedArcs] = useState<string[]>([]);
  const [queryType, setQueryType] = useState<boolean>(false); // False is randomly generated, true is chronological
  const [playlistLength, setPlaylistLength] = useState<number>(1);
  const [excludedSeries, setExcludedSeries] = useState<string[]>([]);
  const [excludedSeasons, setExcludedSeasons] = useState<string[]>([]);
  const loggedIn: boolean = false;

  const playlistQuery = useQuery({
    queryKey: [
      'genPlaylist',
      playlistLength,
      excludedArcs,
      excludedSeries,
      excludedSeasons,
    ],
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
    <div className=' bottom-0 left-0 w-screen  bg-blue-950 text-black flex flex-col justify-evenly items-center h-subsection font-thunderman'>
      <div className='flex justify-between items-center h-fit w-full'>
        <div className='flex justify-center w-1/3'>
          <img src={marceline} width='auto' />
        </div>
        <div className='flex flex-col items-center w-1/3 z-10'>
          <FormContainer
            loggedIn={loggedIn}
            queryType={queryType}
            setPlaylistLength={setPlaylistLength}
            setExcludedSeries={setExcludedSeries}
            excludedSeries={excludedSeries}
            excludedSeasons={excludedSeasons}
            setExcludedSeasons={setExcludedSeasons}
            excludedArcs={excludedArcs}
            setExcludedArcs={setExcludedArcs}
          />
          <button
            className='navbar-button self-center text-white text-lg'
            type='submit'
            form='generator'
            value='Submit'
            onClick={handleSubmit}>
            Generate Playlist
          </button>
        </div>
        <div className='ml-10 w-1/3 flex justify-center z-0'>
          <img src={FinnJakeRelax} width='90%' />
        </div>
      </div>
      {showPlaylist ? (
        <Carousel playlist={playlist} />
      ) : (
        <div className='flex h-card w-screen justify-center items-center'></div>
      )}
    </div>
  );
};

export default Generator;
