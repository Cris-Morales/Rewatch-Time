import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import query, { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchPlaylist from '../fetchPlaylist';
import fetchArcList from '../fetchArcList';
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
];

const arcIcons: any = {
  "Finn's Relationships": './arcs/FinnRelationships.webp',
  "Finn's Origin": './arcs/FinnOrigin.png',
  "Finn's Swords": './arcs/FinnSwords.webp',
  "Jake's Relationship": './arcs/jakeAndLady.png',
  "Jake's Power": './arcs/jakePower.png',
  'Jake The Dad': './arcs/jakeDad.png',
  Marceline: './arcs/Marceline.webp',
  'Princess Bubblegum': './arcs/princessBubblegum.jpg',
  'The Ice King': './arcs/IceKing.webp',
  Simon: './arcs/Simon.webp',
  'Simon And Marcy': './arcs/simonAndMarcy.webp',
  Lemongrab: './arcs/Earl.webp',
  Bmo: './arcs/BMO.webp',
  'Fionna And Cake': './arcs/fionnaAndCake.jpg',
  'The Lich': './arcs/Lich.webp',
  'Guest Animator': './arcs/guestAnimator.png',
  Bubbline: './arcs/bubbline.png',
  'Magic Man': './arcs/Magic_man.webp',
  'Non-canon': './arcs/nonCanon.png',
  'Joshua And Margaret': './arcs/joshuaAndMargaret.png',
  Jermaine: './arcs/jermaine.png',
  "Finn's Arm": './arcs/finnsArm.png',
  'The Ghost Lady': './arcs/ghostLady.webp',
  'The Catalyst Comet': './arcs/theComet.png',
};

const Generator = (): JSX.Element => {
  const [playlistLength, setPlaylistLength] = useState<number>(0);
  const [playlist, setPlaylist] = useState<any>([]);
  const [finale, setFinale] = useState<boolean>(false);
  const [playlistTime, setPlaylistTime] = useState<number>(0);
  const [showPlaylist, setShowPlatlist] = useState<boolean>(false);
  const [excludedArcs, setExcludedArcs] = useState<string[]>([]);
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
  //  <div className='flex items-center '>
  //   <label>Include Finale</label>
  //   <input
  //     type='checkbox'
  //     id='finale'
  //     className='my-2 ml-4  checkbox bg bg-gray-800'
  //     onChange={e => {
  //       setFinale(e.target.checked);
  //     }}></input>
  // </div>

  return (
    <div className=' bottom-0 left-0 w-screen  bg-blue-950 text-black flex flex-col justify-evenly items-center h-section border-2 border-solid border-red-600 font-thunderman'>
      <div className='flex justify-center items-center h-fit'>
        <img src={marceline} width='600px' className='mr-10' />
        <div className='flex flex-col items-center'>
          <form
            id='generator'
            className='text-black h-fit w-generatorForm bg-white p-5 flex flex-col rounded-3xl items-center'>
            <div className='my-1 mx- w-full flex items-center justify-between'>
              <h3 className=' text-2xl'>Playlist Generator</h3>
              <p>Is Logged In: false</p>
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer flex justify-center'>
                <span className='mr-2 text-center'>Randomized Playlist</span>
                <input type='checkbox' className='toggle' />
                <span className='text-center ml-2'>
                  Chronologically from Watched Episode
                </span>
              </label>
            </div>
            <div className='flex justify-center items-center'>
              <label className='mr-2'>Max Playlist Length</label>
              <div className='flex items-center'>
                <input
                  className='input input-bordered text-white text-center w-1/4 rounded text-align pt-1.5 pr-3'
                  id='playlistLength'
                  type='number'
                  form='generator'
                  max='280'
                  min='0'
                  defaultValue={1}
                />
                <p className='ml-2'>episodes</p>
              </div>
            </div>
            <div
              id='specify episodes'
              className='m-2 flex justify-center items-center'>
              <h3 className='text-center my-2'>Specify Episodes: </h3>
              <div className='flex justify-center items-center my-2'>
                <label className='mx-2'>All</label>
                <input
                  type='radio'
                  name='radio-1'
                  className='radio border-1 border-black'
                  defaultChecked
                />
                <label className='mx-2'>Watched</label>
                <input
                  type='radio'
                  name='radio-1'
                  className='radio border-1 border-black'
                />
                <label className='mx-2'>Unwatched</label>
                <input
                  type='radio'
                  name='radio-1'
                  className='radio border-1 border-black'
                />
              </div>
            </div>
            <div id='specify series' className='m-2 flex'>
              <div className='dropdown dropdown-left text-white'>
                <div tabIndex={0} className='btn'>
                  Specify Series
                </div>
                <ul
                  tabIndex={0}
                  className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
                  {seriesList.map(series => {
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
              <label className='border-2 border-black rounded-box label mx-2 flex items-center justify-center cursor-pointer'>
                <span className='mr-2'>Include Finale</span>
                <input
                  type='checkbox'
                  className='checkbox border-1 border-black'
                />
              </label>
              <div className='dropdown dropdown-right text-white'>
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
            </div>
            <div className='m-2'>
              <div className='dropdown dropdown-right text-white'>
                <div tabIndex={0} className='btn'>
                  Specify Arcs
                </div>
                <ul
                  tabIndex={0}
                  className='block overflow-y-scroll h-96 w-auto p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
                  {arcs.map(arc => {
                    return (
                      <li className='h-40 w-32'>
                        <label className='label curser-pointer flex flex-col items-center justify center text-center'>
                          <span className='flex flex-col items-center'>
                            {arc}
                            <img
                              src={arcIcons[arc]}
                              alt={arc}
                              className='h-16 w-auto'
                            />
                          </span>
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
            </div>
            <div className='m-2'>
              <div className='dropdown dropdown-right text-white'>
                <div tabIndex={0} className='btn'>
                  Select Watched Episode to Start From
                </div>
                <ul
                  tabIndex={0}
                  className='block overflow-y-scroll h-96 w-auto p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
                  {arcs.map(arc => {
                    return (
                      <li className='h-40 w-32'>
                        <label className='label curser-pointer flex flex-col items-center justify-center text-center'>
                          <span>
                            {arc}
                            <img
                              src={arcIcons[arc]}
                              alt={arc}
                              className='h-16 w-auto'
                            />
                          </span>
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
            </div>
          </form>
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
      {
        showPlaylist ? <Carousel playlist={playlist} /> : null
        // <div className='flex h-card w-screen justify-center items-center z-10'></div>
      }
      {/* ^ I want it to slide or fade into the div. */}
    </div>
  );
};

export default Generator;
