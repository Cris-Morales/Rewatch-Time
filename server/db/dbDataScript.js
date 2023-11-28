// import model from './model';
import { pool, query } from './model.js';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./server/db/episodes.json'));
const series = ['main', 'stakes', 'islands'];
const seasons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

/**
 * @InsertionScripts
 */

const arcData = async () => {
  try {
    for (const arc of arcs) {
      const arcQuery = {
        text: 'INSERT INTO arcs(arc) VALUES ($1)',
        values: [arc],
      };
      const result = await query(arcQuery.text, arcQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const seriesData = async () => {
  try {
    for (const name of series) {
      const seriesQuery = {
        text: 'INSERT INTO series(series_name) VALUES ($1)',
        values: [name],
      };
      const result = await query(seriesQuery.text, seriesQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const seasonData = async () => {
  try {
    for (const season of seasons) {
      const seasonQuery = {
        text: 'INSERT INTO seasons(season_number) VALUES ($1)',
        values: [season],
      };
      const result = await query(seasonQuery.text, seasonQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const episodeData = async () => {
  try {
    let currSeason = -Infinity;
    let seasonEpisode = 1;
    for (const episode of data) {
      if (episode.season > currSeason) {
        currSeason = episode.season;
        seasonEpisode = 1;
      } else {
        seasonEpisode++;
      }
      const episodeQuery = {
        text: 'INSERT INTO episodes(episode_number, title, synopsis, airdate, season_id, season_episode) VALUES ($1, $2, $3, $4, $5, $6)',
        values: [
          episode.id,
          episode.name,
          episode.summary,
          episode.airdate,
          episode.season,
          seasonEpisode,
        ],
      };
      const result = await query(episodeQuery.text, episodeQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

/**
 * @Phase1
 */

// arcData();
// seriesData();
// seasonData();
// episodeData();

/**
 * @Phase2
 */
