// import model from './model';
import { pool, query } from './model.js';
import fs from 'fs';

/**
 * @Phase1
 * Singular Tables.
 */

const data = JSON.parse(fs.readFileSync('./server/db/episodes.json'));
const series = ['main', 'stakes', 'islands'];
const seasons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arcs = [
  'Finn', // Finn's growth, backstory, destiny and relationships
  'Jake', // Jake's backstory, destiny, personality, and relationships
  'Marceline', // Marcy's backstory, relationships, and personality
  'Princess Bubblegum', // PB's backstory, relationships, character growth, and relationships.
  'The Ice King', // all ice king and simon episodes, just to see him be crazy and tragic
  'Simon', // Simon focused episodes, not the same as ice king. at least how i first thought of it. Might extend this arc to Betty, though she might have one of her own.
  'Simon and Marcy', // Focus on Marcy's relationship with Simon, or hints at it (holly jolly secrets)
  'Lemongrab', //Pretty much every episode with lemongrab
  'BMO', // Pretty much every episode with BMO as a major role.
  'Fionna and Cake', // Every fionna and cake focused episode
  "Finn's Relationships", // every episode that shows, or hints at finn's relationships.
  'Guest Animator', // every guest animatory episode
  'Bubbline', // every episode with or exploring marceline and pb's relationship
  'Magic Man', // every episode with magic man playing an important role.
]; // i think simon and ice king is kind of redundant, but this is for experienced watchers. idk we'll see, i think ill leave it for now
// for all, minor appearances are scrapped from arcs, unless there's something weird that happens.

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

// arcData();
// seriesData();
// seasonData();
// episodeData();

/**
 * @Phase2
 * Episode_Series Join Table
 */

const esData = async () => {
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

const esData2 = async () => {
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

const esData3 = async () => {
  try {
    for (const episode of data.slice(244, 252)) {
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

// esData(); // Main Series in many to many relationship
// esData2(); // Stakes mini-series
// esData3(); //islands miniseries

/**
 * @Phase3
 * episode_arcs Join Table
 */

// This is a tough one where I'm going to have to do some research on the arcs I have
// I'll start by looking at the wiki for obvious ones like magic man, bubbline, and guest animators
// but finn, jake, and pb are a different story
// do I include episodes where the character arc takes center stage? or do I do every episode that they appear in?
// one takes more work than the other, i think the intention is that these are character arcs or significant episodes for the lore.
// if that's the case, than this is more work
// tool tips over the arcs will clarify this to the user. See comments
