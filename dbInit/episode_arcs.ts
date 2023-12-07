// import model from './model';
import { pool, query } from '../server/db/model.js';
import fs from 'fs';

/**
 * @Phase3
 * episode_arcs Join Table
 */

const iceKing = [
  'Prisoners of Love',
  'Ricardio the Heart Guy',
  'What is Life?',
  'When Wedding Bells Thaw',
  'What Have You Done?',
  'The Eyes',
  'Loyalty to the King',
  'The Chamber of Frozen Blades',
  'Mortal Folly',
  'Mortal Recoil',
  'The Wand',
  'Hitman',
  'Still',
  'Wizard Battle',
  'Holly Jolly Secrets Part I',
  'Holly Jolly Secrets Part II',
  'Five Short Graybles',
  'Princess Monster Wife',
  'Beyond this Earthly Realm',
  'Reign of Gunters',
  'I Remember You',
  'Five More Short Graybles',
  'Mystery Dungeon',
  'Bad Little Boy',
  'Simon & Marcy',
  'A Glitch is a Glitch',
  'Princess Potluck',
  "The Party's Over, Isla de Señorita",
  'Another Five More Short Graybles',
  'Frost & Fire',
  'Play Date',
  'Betty',
  'The Prince Who Wanted Everything',
  'Thanks for the Crabapples, Giuseppe',
  'Friends Forever',
  'Graybles 1000+',
  'Water Park Prank',
  'Orgalorg',
  'Empress Eyes',
  "King's Ransom",
  'Broke His Crown',
  'Elemental',
  'Five Short Tables',
  'The Music Hole',
  'Bespoken For',
  'Winter Light',
  'Hero Heart',
  'Skyhooks II',
  'Fionna and Cake and Fionna',
  'Always BMO Closing',
  'Blenanas',
  'Come Along With Me',
];
const guestAnimator = [
  'James Baxter the Horse',
  'A Glitch is a Glitch',
  'Food Chain',
  'Water Park Prank',
  'Bad Jubies',
  'Beyond the Grotto',
  'Horse and Ball',
  'Ketchup',
  'Diamonds and Lemons',
];
const nonCanon = [
  'Diamonds and Lemons',
  'A Glitch is a Glitch',
  'Food Chain',
  'Bad Jubies',
];
const finnOrigin = [
  'Min and Marty',
  'Memories of Boom Boom Mountain',
  'Susan Strong',
  "Billy's Bucket List",
  'Wake Up',
  'Escape from the Citadel',
  'The Visitor',
  'On the Lam',
  'The Comet',
  'Her Parents',
  'Beautopia',
  'Dark Purple',
  'Betty',
  'Preboot',
  'Reboot',
  'The Invitation',
  'Whipple the Happy Dragon',
  'Mysterious Island',
  'Imaginary Resources',
  'Hide and Seek',
  'Min and Marty',
  'Helpers',
  'The Light Cloud',
  'Come Along With Me',
];
const finnSwords = [
  'The Real You',
  'Mystery Train',
  "Dad's Dungeon",
  'Play Date',
  'The Pit',
  'Blade of Grass',
  'Escape from the Citadel',
  'Breezy',
  'Is That You?',
  'Marcy & Hunson',
  'Two Swords',
  'Do No Harm',
  'Whispers',
  'Three Buckets',
  'Seventeen',
  'Come Along With Me',
];
const fionnaCake = [
  'Fionna and Cake',
  'Bad Little Boy',
  'The Prince Who Wanted Everything',
  'Five Short Tables',
  'Fionna and Cake and Fionna',
];
const bmo = [
  'Guardians of Sunshine',
  'Video Makers',
  'What Was Missing',
  'The Creeps',
  'Holly Jolly Secrets Part I',
  'Holly Jolly Secrets Part II',
  'Five Short Graybles',
  'Hug Wolf',
  'BMO Noire',
  'Five More Short Graybles',
  'Puhoy',
  'BMO Lost',
  'James Baxter the Horse',
  'Shh!',
  'Be More',
  'We Fixed a Truck',
  'Apple Wedding',
  'Ghost Fly',
  'Jake The Brick',
  'Chips and Ice Cream',
  'Graybles 1000+',
  "All's Well That Rats Swell",
  'Football',
  'The More You Moe, The Moe You Know (Part I)',
  'The More You Moe, The Moe You Know (Part II)',
  'Angel Face',
  'Bad Jubies',
  'Horse and Ball',
  'The Invitation',
  'Whipple The Happy Dragon',
  'Imaginary Resources',
  'The Light Cloud',
  'Orb',
  'Skyhooks',
  'Ketchup',
  'Always BMO Closing',
  'Seventeen',
  'Come Along With Me',
];
const lemongrab = [
  'Too Young',
  'You Made Me',
  'Mystery Dungeon',
  'All Your Fault',
  'Another Five More Short Graybles',
  'Too Old',
  'Lemonhope Part 1',
  'Lemonhope Part 2',
  'The Mountain',
  'Diamonds and Lemons',
  'Normal Man',
  'Come Along With Me',
];
const pbMarcy = [
  'Go With Me',
  'What Was Missing',
  'All the Little People',
  'Simon & Marcy',
  'Sky Witch',
  'Time Sandwich',
  'Varmints',
  'Marceline The Vampire Queen',
  'Everything Stays',
  'Vamps About',
  'The Empress Eyes',
  'May I Come In?',
  'Take Her Back',
  'Checkmate',
  'The Dark Cloud',
  'Broke His Crown',
  'Skyhooks',
  'Bespoken For',
  'Winter Light',
  'Cloudy',
  'Slime Central',
  'Happy Warrior',
  'Hero Heart',
  'Skyhooks II',
  'Ketchup',
  'Seventeen',
  'Come Along With Me',
];
const simonMarcy = [
  'Holly Jolly Secrets Part I',
  'Holly Jolly Secrets Part II',
  'It Came from the Nightosphere',
  'Memory of a Memory',
  'Return to the Nightosphere',
  "Daddy's Little Monster",
  'I Remember You',
  'Finn the Human',
  'Bad Little Boy',
  'Simon & Marcy',
  'Betty',
  'The Empress Eyes',
  'Take Her Back',
  'The Dark Cloud',
  'Broke His Crown',
  'Come Along With Me',
];
const marcy = [
  'Evicted!',
  'Henchman',
  'It Came from the Nightosphere',
  'Go With Me',
  'Heat Signature',
  'Memory of a Memory',
  'What Was Missing',
  "Marceline's Closet",
  'Return to the Nightosphere',
  "Daddy's Little Monster",
  'I Remember You',
  'Finn the Human',
  'Five More Short Graybles',
  'Bad Little Boy',
  'Simon & Marcy',
  'Sky Witch',
  'Red Starved',
  'Betty',
  'Princess Day',
  'Sow, Do You like Them Apples',
  'Varmints',
  'Marceline The Vampire Queen',
  'Everything Stays',
  'Vamps About',
  'The Empress Eyes',
  'May I Come In?',
  'Take Her Back',
  'Checkmate',
  'The Dark Cloud',
  'Broke His Crown',
  'The Music Hole',
  'Skyhooks',
  'Hero Heart',
  'Ketchup',
  'Seventeen',
  'Marcy & Hunson',
  'Come Along With Me',
];
// const arcsTitles = {
//   13: iceKing,
//   21: guestAnimator,
//   24: nonCanon,
//   3: finnOrigin,
//   4: finnSwords,
//   18: fionnaCake,
//   17: bmo,
//   16: lemongrab,
//   22: pbMarcy,
//   15: simonMarcy,
//   11: marcy,
// };
const finnRel = [
  1, 5, 7, 19, 36, 41, 46, 51, 52, 57, 60, 62, 78, 85, 94, 96, 100, 109, 116,
  125, 131, 134, 135, 136, 139, 140, 151, 160, 162, 178, 179, 181, 184, 198,
  199, 223, 224, 231, 260, 267, 271, 280,
];
const lich = [51, 52, 104, 105, 106, 157, 158, 182, 195, 199, 234, 265]; // the lich
const mm = [20, 93, 109, 137, 174, 194, 226, 232, 255, 261, 277, 280]; // magic man
const finnRelArc = async () => {
  try {
    for (const ep of finnRel) {
      const sqlQuery = {
        text: 'INSERT INTO episodes_arcs(episode_id, arc_id) VALUES($1, $2)',
        values: [ep, 1],
      };
      const result = await query(sqlQuery.text, sqlQuery.values);
      console.log('Data inserted:', result.rows);
    }
    return;
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};
const lichArc = async () => {
  try {
    for (const ep of lich) {
      const sqlQuery = {
        text: 'INSERT INTO episodes_arcs(episode_id, arc_id) VALUES($1, $2)',
        values: [ep, 19],
      };
      const result = await query(sqlQuery.text, sqlQuery.values);
      console.log('Data inserted:', result.rows);
    }
    return;
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};
const mmArc = async () => {
  try {
    for (const ep of mm) {
      const sqlQuery = {
        text: 'INSERT INTO episodes_arcs(episode_id, arc_id) VALUES($1, $2)',
        values: [ep, 23],
      };
      const result = await query(sqlQuery.text, sqlQuery.values);
      console.log('Data inserted:', result.rows);
    }
    return;
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};
const jakeRel = [
  'My Two Favorite People',
  'From Bad to Worse',
  'Lady & Peebles',
  'Jake the Dad',
  'The Pit',
  'Burning Low',
  'The Diary',
  'Lady Rainicorn of the Crystal Dimension',
  'The Music Hole',
  'Slumber Party Panic',
  'The Enchiridion!',
  'Her Parents',
  'Go With Me',
  'Video Makers',
  'The Creeps',
  'All the Little People',
  'Jake Suit',
];
const jakeDad = [
  'Lady & Peebles',
  'Jake the Dad',
  'Daddy-Daughter Card Wars',
  'One Last Job',
  'Another Five More Short Graybles',
  'Ocarina',
  'Wheels',
  'The Diary',
  'Lady Rainicorn of the Crystal Dimension',
  'Summer Showers',
];
const jakePower = [
  "The Witch's Garden",
  'Rainy Day Daydream',
  'The Limit',
  'Jake the Dad',
  'Jake the Brick',
  'Joshua and Margaret Investigations',
  'The First Investigation',
  'Jake the Starchild',
  'Abstract',
  'Beautopia',
  'Loyalty to the King',
  'The Silent King',
  'Jake Suit',
];
const pb = [
  'Simon & Marcy',
  'Slumber Party Panic',
  'The Enchiridion!',
  'Ricardio the Heart Guy',
  'The Duke',
  'What Have You Done?',
  'The Other Tarts',
  'The Real You',
  'Go With Me',
  'Mortal Folly',
  'Mortal Recoil',
  'Too Young',
  'Wizard Battle',
  'What Was Missing',
  'The Creeps',
  'From Bad to Worse',
  'Five Short Graybles',
  "To Cut a Woman's Hair",
  'Goliad',
  'Princess Cookie',
  'Burning Low',
  'Lady & Peebles',
  'You Made Me',
  'Reign of Gunters',
  'The Lich',
  'All Your Fault',
  'A Glitch is a Glitch',
  'Princess Potluck',
  'The Suitor',
  "The Party's Over, Isla de Señorita",
  'Wizards Only, Fools',
  'Sky Witch',
  'Too Old',
  'Earth & Water',
  'The Vault',
  'James',
  'Root Beer Guy',
  'Apple Wedding',
  'Rattleballs',
  'Bad Timing',
  'Lemonhope Part 1',
  'Lemonhope Part 2',
  'James II',
  'The Tower',
  'Something Big',
  'Nemesis',
  'The Cooler',
  'The Pajama War',
  'Graybles 1000+',
  'Hot Diggity Doom',
  'Have You Seen the Muffin Mess',
  'Bonnie and Neddy',
  'Varmints',
  'Marceline The Vampire Queen',
  'Vamps About',
  'May I Come In?',
  'Take Her Back',
  'Checkmate',
  'The Dark Cloud',
  'The Thin Yellow Line',
  'Broke His Crown',
  'Elemental',
  'The Music Hole',
  'Reboot',
  'High Strangeness',
  'Jelly Beans Have Power',
  'The Invitation',
  'Skyhooks',
  'Hero Heart',
  'Bonnibel Bubblegum',
  'Seventeen',
  'Gumbaldia',
  'Come Along With Me',
];
const sim = [
  'When Wedding Bells Thaw',
  'Holly Jolly Secrets Part I',
  'Holly Jolly Secrets Part II',
  'I Remember You',
  'Simon & Marcy',
  'Betty',
  'Evergreen',
  'You Forgot Your Floaties',
  'Everything Stays',
  'The Dark Cloud',
  "King's Ransom",
  'Broke His Crown',
  'Bespoke For',
  'Skyhooks II',
  'Temple of Mars',
  'Come Along With Me',
];
const jm = [
  'Crystals Have Power',
  "Dad's Dungeon",
  'Jake the Dog',
  "Billy's Bucket List",
  'The Pit',
  'Joshua and Margaret Investigations',
  'Memories of Boom Boom Mountain',
  'Jake the Dad',
  'Whipple The Happy Dragon',
  'Orb',
  'The First Investigation',
];
const jerm = [
  'Jake the Starchild',
  'Jermaine',
  'Memory of a Memory',
  'Orb',
  'Abstract',
  'Temple of Mars',
  'Crystals Have Power',
  'Jake the Dad',
  'Joshua and Margaret Investigations',
  'The First Investigation',
  'Come Along With Me',
];
const finnArm = [
  'Mortal Folly',
  'Puhoy',
  'Finn the Human',
  'Jake the Dog',
  'The Vault',
  'Escape from the Citadel',
  'Breezy',
  'Preboot',
  'Reboot',
  'King Worm',
  'The Comet',
  'Crossover',
  'Dungeon Train',
  'Three Buckets',
  'The Tower',
];
const ghostLady = [
  'The Vault',
  'The Creeps',
  'King Worm',
  'Come Along With Me',
];
const comet = [
  'Everygreen',
  'The Vault',
  'Astral Plane',
  'Orgalorg',
  'Hot Diggity Doom',
  'Be Sweet',
  'The Comet',
  'On the Lam',
  'Hoots',
];
const arcsTitles = {
  8: jakeRel,
  9: jakeDad,
  10: jakePower,
  12: pb,
  14: sim,
  20: jm,
  25: jerm,
  26: finnArm,
  27: ghostLady,
  28: comet,
};
const episodeArcs = async () => {
  for (const arc in arcsTitles) {
    try {
      for (const title of arcsTitles[arc]) {
        console.log('arc num and title: ', arc, title);
        const sqlQuery = {
          text: `INSERT INTO episodes_arcs(episode_id, arc_id) SELECT episode_id, $1 FROM episodes WHERE title = $2`,
          values: [arc, title],
        };
        const result = await query(sqlQuery.text, sqlQuery.values);
        console.log('Data inserted');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }
};

episodeArcs();
