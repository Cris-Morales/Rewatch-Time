// import model from './model';
import { pool, query } from './model.js';
import fs from 'fs';

/**
 * @Phase3
 * episode_arcs Join Table
 */
const leftOverArcs = [
  "jake's relationship", // 8 mostly with lady rainacorn, maybe finn and jake centric episodes, but the later would be a lot
  'jake the dad', // 9 all his kin episodes
  "jake's power", // 10 - a lot of episodes focus on his power, but this could encompass his origin as well, which i might do to save time.
  'princess bubblegum', // 12 PB's backstory (mother gum, bonnie and netty, gumbald, shoko), and character growth (monarch, science empress, mellowed out, gumbald)
  'simon', // 14 A lot of these extend to Simon and Marcy until the Fionna and Cake series. Leave it for now
  'joshua, margeret and jermaine', // 20 joshua, margeret, and jermaine
];
// add betty, remove jake past and origin.
// I might axe the destiny stuff. I'll parse it to finn's arm, shoko, and the comet.
// remove jashua margeret and jermain and just have 2 seperate categories???
// might edit it to joshua and margeret and then just add jermaine.

// ice king: 13
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
// 21
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
// 24
const nonCanon = [
  'Diamonds and Lemons',
  'A Glitch is a Glitch',
  'Food Chain',
  'Bad Jubies',
];
// 2
const finnDestiny = [
  'King Worm',
  'Puhoy',
  'Mortal Folly',
  'Dungeon Train',
  'Breezy',
  'Escape from the Citadel',
  'The Comet',
  'Crossover',
  'Reboot',
  'The Mountain',
  'The Lich',
  'Jake the Dog',
  'Blade of Grass',
  'Wake Up',
  'Three Buckets',
  'Finn the Human',
  'Still',
  'Evergreen',
  'Astral Plane',
  'The Tower',
  'The Creeps',
  'The Vault',
  'The Visitor',
  'Orgalorg',
  'Hot Diggity Doom',
];
// 3
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
// 4
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
// 18
const fionnaCake = [
  'Fionna and Cake',
  'Bad Little Boy',
  'The Prince Who Wanted Everything',
  'Five Short Tables',
  'Fionna and Cake and Fionna',
];
// 17
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
// 16
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
// 22
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
// 15
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
// 11
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
const arcsTitles = {
  13: iceKing,
  21: guestAnimator,
  24: nonCanon,
  2: finnDestiny,
  3: finnOrigin,
  4: finnSwords,
  18: fionnaCake,
  17: bmo,
  16: lemongrab,
  22: pbMarcy,
  15: simonMarcy,
  11: marcy,
};
const finnRel = [
  1, 5, 7, 19, 36, 41, 46, 51, 52, 57, 60, 62, 78, 85, 94, 96, 100, 109, 116,
  125, 131, 134, 135, 136, 139, 140, 151, 160, 162, 178, 179, 181, 184, 198,
  199, 223, 224, 231, 260, 267, 271, 280,
]; // 1
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

// await finnRelArc();
// await lichArc();
// await mmArc();

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
