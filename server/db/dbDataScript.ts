// import model from './model';
import { pool, query } from './model.js';
import fs from 'fs';

/**
 * @Phase1
 * Singular Tables.
 */

const data = JSON.parse(fs.readFileSync('./server/db/episodes.json'));
const series: string[] = ['main', 'stakes', 'islands'];
const seasons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arcs = [
  "finn's relationships", // every episode that shows, or hints at finn's relationships.
  "finn's destiny", // arm, shoko, the comet, past lives, adult life, afterlife
  "finn's origin", // where are the humans, how finn got found,
  "finn's swords", // self explainatory
  "jake's origin", // jake the starchild, and allusions to where his power comes from
  "jake's past", // funny allusions to his past as a thief, card wars, and the implication that he's jt dogzone, things with his dog family that didnt include finn
  "jake's destiny", // mostly alluding to jake reaching the 50th dead world, him dying, his reencarnation and him being zen
  "jake's relationship", // mostly with lady rainacorn
  'jake the dad', // all his kin episodes
  "jake's power", // episodes focused on his power, jake the brick, the limit, jake suit, knife storm. etc. my excuse for random jake focused episodes.
  'marceline', // Marcy's backstory, relationships, and personality
  'princess bubblegum', // PB's backstory (mother gum, bonnie and netty, gumbald, shoko), and character growth (monarch, science empress, mellowed out, gumbald)
  'the ice king', // all ice king and simon episodes, just to see him be crazy and tragic
  'simon', // Simon focused episodes, not the same as ice king. at least how i first thought of it. Might extend this arc to Betty, though she might have one of her own.
  'simon and marcy', // Focus on Marcy's relationship with Simon, or hints at it (holly jolly secrets)
  'lemongrab', //Pretty much every episode with lemongrab, and/or the lemonhope saga
  'bmo', // Pretty much every episode with BMO as a major role.
  'fionna and cake', // Every fionna and cake focused episode
  'the lich', // every episode with the lich
  'joshua, margeret and jermaine', // joshua, margeret, and jermaine
  'guest animator', // every guest animatory episode
  'bubbline', // every episode with or exploring marceline and pb's relationship
  'magic man', // every episode with magic man playing an important role.
];

/**
 * @InsertionScripts
 */

const arcData = async (): Promise<void> => {
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

const seriesData = async (): Promise<void> => {
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

const seasonData = async (): Promise<void> => {
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

const episodeData = async (): Promise<void> => {
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
 * @Phase2
 * Episode_Series Join Table
 */

const esData = async (): Promise<void> => {
  try {
    for (const episode of data) {
      const esQuery = {
        text: 'INSERT INTO episode_series(series_id, episode_id) VALUES ($1, $2)',
        values: [1, episode.id],
      };
      const result = await query(esQuery.text, esQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const esData2 = async (): Promise<void> => {
  try {
    for (const episode of data.slice(204, 212)) {
      const esQuery = {
        text: 'INSERT INTO episode_series(series_id, episode_id) VALUES ($1, $2)',
        values: [2, episode.id],
      };
      const result = await query(esQuery.text, esQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const esData3 = async (): Promise<void> => {
  try {
    for (const episode of data.slice(244, 252)) {
      const esQuery = {
        text: 'INSERT INTO episode_series(series_id, episode_id) VALUES ($1, $2)',
        values: [3, episode.id],
      };
      const result = await query(esQuery.text, esQuery.values);
      console.log('Data inserted:', result.rows);
    }
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// await arcData();
// await seriesData();
// await seasonData();
// await episodeData();

// await esData(); // Main Series in many to many relationship
// await esData2(); // Stakes mini-series
// await esData3(); //islands miniseries
