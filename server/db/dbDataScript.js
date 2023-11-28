// import model from './model';
import { pool, query } from './model.js';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./server/db/episodes.json'));

/**
 * @SaveInThisOrder
 *   @Episodes
 *   @Series main, and distant lands, saving fionna and cake for crud
 *   @Arcs a lot lol
 *   @Seasons
 */
const series = ['Main', 'Distant Lands'];
// series

const arcs = [
  'Finn',
  'Jake',
  'Marceline',
  'Princess Bubblegum',
  'The Ice King',
  'Simon',
  'Simon and Marcy',
  'Lemongrab',
  'BMO',
  'Fionna and Cake',
  "Finn's Relationships",
  'Guest Animator',
  'Bubbline',
  'Magic Man',
];
// Arcs.... oof

const seasons = [
  { 1: 1 },
  { 2: 1 },
  { 3: 1 },
  { 4: 1 },
  { 5: 1 },
  { 6: 1 },
  { 7: 1 },
  { 8: 1 },
  { 9: 1 },
  { 10: 1 },
  { 1: 2 },
];
// Season number, series_ID

// psql -d URI -f backend/db/tsDB_init.sql

const insertData = async () => {
  try {
    for (const episode of data) {
      const episodeQuery = {
        text: 'INSERT INTO Episodes(title, synopsis, episode_number, airdate) VALUES ($1, $2, $3, $4)',
        values: [episode.name, episode.summary, episode.id, episode.airdate],
      };
      const result = await query(episodeQuery.text, episodeQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

insertData();
/**
Table Episodes {
  episode_id SERIAL [primary key]
  title varchar
  synopsis text
  episodeNumber integer
  airdate date
}
 */
