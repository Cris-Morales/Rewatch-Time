import { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../db/model.js';

interface EpisodeController {
  getExcludedArcEpisodes: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  getPlaylist: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylistArcs: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylistSeries: (req: Request, res: Response, next: NextFunction) => void;
  getEpisode: (req: Request, res: Response, next: NextFunction) => void;
  getAllEpisodes: (req: Request, res: Response, next: NextFunction) => void;
  getAllArcs: (req: Request, res: Response, next: NextFunction) => void;
  getAllSeries: (req: Request, res: Response, next: NextFunction) => void;
  getAllSeasons: (req: Request, res: Response, next: NextFunction) => void;
}

interface arcRow {
  arc: string;
  arc_id: number;
}
interface seriesRow {
  series_name: string;
}
interface seasonsRow {
  series_name: string;
  season_number: number;
  season_id: number;
}

const episodeController: EpisodeController = {
  getExcludedArcEpisodes: async (req, res, next) => {
    try {
      const episodeQuery =
        'SELECT DISTINCT episodes_arcs.episode_id FROM episodes_arcs JOIN episodes ON episodes.episode_id = episodes_arcs.episode_id JOIN seasons ON episodes.season_id = seasons.season_id WHERE seasons.season_id NOT IN (10,9,8,7,6,5,4) AND episodes_arcs.arc_id IN (1,8) ORDER BY episode_id DESC';
      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
  getPlaylist: async (req, res, next) => {
    try {
      const { playlistLength, excludedArcs, excludedSeries, excludedSeasons } =
        req.body;

      const excludedSeasonsNum: any[] = excludedSeasons.map((season: string) =>
        parseInt(season),
      );
      const excludedArcsNum: any[] = excludedArcs.map((arc: string) =>
        parseInt(arc),
      );

      console.log(
        'getPlaylist queried, playlistLength: ',
        playlistLength,
        'excludedArcs: ', // arc_id
        excludedArcsNum,
        'excludedSeries: ', // series_name
        excludedSeries,
        'excludedSeasons: ', // seasonId
        excludedSeasonsNum,
      );

      const bodyArray: any = [
        excludedSeasonsNum,
        excludedArcsNum,
        [playlistLength],
      ];
      let paramsNumber = 1;

      const paramsArray: any = bodyArray.map((bodyProperty: any[]) => {
        return bodyProperty.map(() => {
          const paramIndex = '$' + `${paramsNumber}`;
          paramsNumber++;
          return paramIndex;
        });
      });

      // modify query to exlude arcs, series, and seasons.
      const playlistQuery = {
        text: `SELECT episodes.episode_id, title, season_number, season_episode, episode_number, episode_card_path, airdate, synopsis
        FROM episodes
        JOIN seasons
        ON episodes.season_id = seasons.season_id
        JOIN episodes_arcs
        ON episodes.episode_id = episodes_arcs.episode_id
        WHERE seasons.season_id NOT IN (${paramsArray[0].join(',')})
        AND
        episodes_arcs.arc_id NOT IN (${paramsArray[1].join(',')})
        ORDER BY RANDOM()
        LIMIT ${paramsArray[2][0]}`,
        values: [...excludedSeasonsNum, ...excludedArcsNum, playlistLength],
      };

      const result: any = await query(playlistQuery.text, playlistQuery.values);
      res.locals.playlistData = result.rows;

      return next();
    } catch (error) {
      console.log('Error in getPlaylist: ', error);
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

        episode.arcs = result.rows.map((row: arcRow) => {
          const arc = row.arc.replace(/\w\S*/g, function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
          });
          return arc;
        });
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

        episode.series = result.rows.map((row: any) => {
          const series = row.series_name.replace(
            /\w\S*/g,
            function (txt: string) {
              return (
                txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
              );
            },
          );
          return series;
        });
      }

      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
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
  getAllArcs: async (req, res, next) => {
    try {
      const arcQuery = 'SELECT arc, arc_id, icon_path FROM arcs';
      const result: any = await query(arcQuery);
      const arcsArray: string[] = result.rows.map((row: arcRow) => {
        const arc = row;
        row.arc = row.arc.replace(/\w\S*/g, function (txt: string) {
          return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });
        return arc;
      });
      res.locals.currentArcList = arcsArray;
      return next();
    } catch (error) {
      console.log('Error in getAllArcs: ', error);
      return next(error);
    }
  },
  getAllSeries: async (req, res, next) => {
    try {
      const seriesQuery = 'SELECT series_name FROM series';
      const result: any = await query(seriesQuery);
      const seriesArray: string[] = result.rows.map((row: seriesRow) => {
        const series_name = row.series_name.replace(
          /\w\S*/g,
          function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
          },
        );
        return series_name;
      });
      res.locals.dbSeriesList = seriesArray;
      return next();
    } catch (error) {
      console.log('Error in getAllSeries: ', error);
      return next(error);
    }
  },
  getAllSeasons: async (req, res, next) => {
    try {
      const seasonQuery =
        'SELECT season_number, series_name, season_id FROM seasons JOIN series ON series.series_id = seasons.series_id';
      const result: any = await query(seasonQuery);
      const seasonsArray: string[] = result.rows.map((row: seasonsRow) => {
        const series_name = row.series_name.replace(
          /\w\S*/g,
          function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
          },
        );
        row.series_name = series_name;
      });
      res.locals.dbSeasonsList = result.rows;
      return next();
    } catch (error) {
      console.log('Error in getAllSeries: ', error);
      return next(error);
    }
  },
  getAllEpisodes: async (req, res, next) => {
    try {
      console.log('in');
    } catch (error) {
      console.error('Error in getAllEpisodes: ', error);
      return next(error);
    }
  },
};

// Need seperate queries, otherwise, I'll get multiple rows of the same episode
//

export default episodeController;
