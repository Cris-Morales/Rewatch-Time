import React, { FC } from 'react';

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
  Uncategorized: './arcs/dumbRock.webp',
};

const ArcsForm = ({ arcs }) => {
  return (
    <div className='dropdown dropdown-bottom mx-2'>
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
                    className='h-16 w-auto rounded-box'
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
  );
};

export default ArcsForm;
