import React, { FC } from 'react';
import { useState, useContext } from 'react';

const arcIcons = {
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

const CardArcIconsList = ({ arcsList }): JSX.Element => {
  return (
    <div className='z-10 flex flex-wrap w-fit h-16'>
      {arcsList.map((arc, index) => {
        return (
          <div
            key={`${arc} + ${index}`}
            id='arcIcon'
            className='h-16 w-16 m-1 tooltip'
            data-tip={arc}>
            <div className='h-16 w-16 rounded-full object-fill flex justify-center items-center overflow-hidden'>
              <img src={arcIcons[arc]} alt={arc} className='w-auto h-full' />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardArcIconsList;
