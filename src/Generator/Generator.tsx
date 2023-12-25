import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchPlaylist from '../fetchPlaylist';
import fetchArcList from '../fetchArcList';
import FormContainer from './FormContainer';
const marceline: string = 'assets/Marceline.png';
const FinnJakeRelax: string = 'assets/FinnJakeRelax.png';
const bmo: string = 'arcs/BMO.webp';

// need playlist interface
const seriesList: string[] = [
  'Main',
  'Mini-Series: Stakes',
  'Mini-Series: Elemental',
  'Mini-Series: Islands',
  'Distant Lands',
  'Fionna And Cake',
];

const seasonSeries: any = {
  Main: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  'Distant Lands': [1],
  'Fionna and Cake': [1, 2],
};

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
  const loggedIn: boolean = false;

  const playlistQuery = useQuery({
    queryKey: ['genPlaylist', playlistLength, finale, excludedArcs],
    queryFn: fetchPlaylist,
    enabled: false,
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const result = await playlistQuery.refetch();
    setPlaylist(result?.data);
    setShowPlatlist(true);
  };

  // when dev if activated. uncomment this
  // const arcsQuery = useQuery({
  //   queryKey: ['arcs'],
  //   queryFn: fetchArcList,
  // });

  return (
    <div className=' bottom-0 left-0 w-screen  bg-blue-950 text-black flex flex-col justify-evenly items-center h-subsection border-2 border-solid border-red-600 font-thunderman'>
      <div className='flex justify-center items-center h-fit'>
        <img src={marceline} width='600px' className='mr-10' />
        <div className='flex flex-col items-center'>
          <FormContainer
            seriesList={seriesList}
            arcs={arcs}
            seasonSeries={seasonSeries}
            loggedIn={loggedIn}
            queryType={queryType}
            setPlaylistLength={setPlaylistLength}
            setFinale={setFinale}
          />
          <button
            className='navbar-button self-center text-white text-lg'
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
      {showPlaylist ? (
        <Carousel playlist={playlist} />
      ) : (
        <div className='flex h-card w-screen justify-center items-center z-10'></div>
      )}
    </div>
  );
};

export default Generator;
