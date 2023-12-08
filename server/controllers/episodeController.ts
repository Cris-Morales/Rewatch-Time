import { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../db/model.js';

interface EpisodeController {
  getEpisode: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylist: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylistArcs: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylistSeries: (req: Request, res: Response, next: NextFunction) => void;
}

interface dbQuery {
  text: string;
  values: any[];
}

const episodeController: EpisodeController = {
  getEpisode: async (req, res, next) => {
    try {
      const episodeQuery = 'SELECT * FROM episodes where episode_id = 1';
      const result: any = await query(episodeQuery);
      res.locals.cardData = result.rows[0];
      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
  getPlaylist: async (req, res, next) => {
    try {
      const { finale, playlistLength } = req.query;
      // const { excludedEpisodes } = res.locals;
      const excludedEpisodes: number[] = [0];
      finale ? null : excludedEpisodes.push(280); // will be concatenated to exclusion list if finale boolean is false (not included)

      console.log('before query');
      const playlistQuery = {
        text: `SELECT * FROM episodes JOIN seasons ON episodes.season_id = seasons.season_id WHERE episode_id NOT IN (${excludedEpisodes.join(
          ',',
        )}) ORDER BY RANDOM() LIMIT $1`,
        values: [playlistLength],
      };
      console.log('after query');

      const result: any = await query(playlistQuery.text, playlistQuery.values);
      res.locals.playlistData = result.rows;
      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
  getPlaylistArcs: async (req, res, next) => {
    try {
      const { playlistData } = res.locals;

      for (const episode of playlistData) {
        const arcQuery = {
          text: `SELECT arc
          FROM episodes_arcs
          JOIN arcs ON episodes_arcs.arc_id = arcs.arc_id
          WHERE episode_id = $1`,
          values: [episode.episode_id],
        };
        const result: any = await query(arcQuery.text, arcQuery.values);

        episode.arcs = result.rows.map((row: any) => row.arc); // array of {"arc": arc_string}
      }

      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
  getPlaylistSeries: async (req, res, next) => {
    try {
      const { playlistData } = res.locals;

      for (const episode of playlistData) {
        const seriesQuery = {
          text: `SELECT series_name
          FROM episode_series
          JOIN series ON episode_series.series_id = series.series_id
          WHERE episode_id = $1`,
          values: [episode.episode_id],
        };
        const result: any = await query(seriesQuery.text, seriesQuery.values);

        episode.series = result.rows.map((row: any) => row.series_name); // array of {"series_name": series_string}
      }

      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
};

// Need seperate queries, otherwise, I'll get multiple rows of the same episode
//

export default episodeController;
