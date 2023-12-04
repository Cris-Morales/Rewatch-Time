import React from 'react';
import { Link } from 'react-scroll';
import finnAndJake from '../../assets/FinnJakeFistBump.png';

const Home = (): JSX.Element => {
  return (
    <div className='home'>
      <img width='500px' height='auto' src={finnAndJake} />

      <p>
        Adventure Time is a show about a boy named Finn and his best friend Jake
        and their adventures in the land of Ooo. It was on the air from 2010 to
        2018, with an additional miniseries, "Distant Lands", and a spin-off
        series "Fionna and Cake". This app generates a random, chronological
        playlist for rewatch sessions, for either old fans or strangely chaotic
        new ones.
      </p>
    </div>
  );
};

export default Home;
