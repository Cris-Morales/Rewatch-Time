import { Request, Response, NextFunction, RequestHandler } from 'express';
import { query } from '../db/model.js';
import { AsyncResource } from 'async_hooks';

interface EpisodeController {
  preGenPlaylist: (req: Request, res: Response, next: NextFunction) => void;
  getExcludedArcEpisodes: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylist: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylistArcs: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylistSeries: (req: Request, res: Response, next: NextFunction) => void;
  getEpisode: (req: Request, res: Response, next: NextFunction) => void;
  getAllEpisodes: (req: Request, res: Response, next: NextFunction) => void;
  getAllArcs: (req: Request, res: Response, next: NextFunction) => void;
  getAllSeries: (req: Request, res: Response, next: NextFunction) => void;
  getAllSeasons: (req: Request, res: Response, next: NextFunction) => void;
  //---------------------------------------------------------------------------
  getWatchedEpisodes: (req: Request, res: Response, next: NextFunction) => void;
  getCardData: (req: Request, res: Response, next: NextFunction) => void;
  addEpisode: (req: Request, res: Response, next: NextFunction) => void;
  updateEpisode: (req: Request, res: Response, next: NextFunction) => void;
  deleteEpisode: (req: Request, res: Response, next: NextFunction) => void;
  updateWatched: (req: Request, res: Response, next: NextFunction) => void;
  updateFavorite: (req: Request, res: Response, next: NextFunction) => void;
  getUserPlaylist: (req: Request, res: Response, next: NextFunction) => void;
  getUserEpisodeData : (req: Request, res: Response, next: NextFunction) => void;
  markEpisode: (req: Request, res: Response, next: NextFunction) => void;
  getEpisodeRequests: (req: Request, res: Response, next: NextFunction) => void;
  addToUserPlaylist: (req: Request, res: Response, next: NextFunction) => void;
  addToPlaylist: (req: Request, res: Response, next: NextFunction) => void;
}

interface arcRow {
  arc: string;
  arc_id: number;
}
interface seriesRow {
  series_name: string;
}
interface seasonsData {
  series_name: string;
  season_number: number;
  season_id: number;
}
interface seriesIdRow {
  series_id: number;
}
interface episodeArcIdRow {
  episode_id: number;
}

const episodeController: EpisodeController = {
  preGenPlaylist: async (req, res, next) => {
    try {
      // all are numbers passed into parameters
      const excludedSeries = req.query.excludedSeries as string;
      const excludedSeasons = req.query.excludedSeasons as string;
      const excludedArcs = req.query.excludedArcs as string;

      const excludedSeriesArray: any[] = excludedSeries.split(',')
      const excludedSeasonsArray: any[] = excludedSeasons.split(',')
      const excludedArcsArray: any[] = excludedArcs.split(',')

      if (excludedSeries.length) {

        res.locals.excludedSeriesIDs = excludedSeriesArray.map((series: string) => {
          parseInt(series);
        });
      } else {
        res.locals.excludedSeriesIDs = [0];
      }

      if (excludedSeasons.length) {
        res.locals.excludedSeasonsNum = excludedSeasonsArray.map((season: string) =>
          parseInt(season),
        );
      } else {
        res.locals.excludedSeasonsNum = [0];
      }
      if (excludedArcs.length) {
        res.locals.excludedArcsNum = excludedArcsArray.map((arc: string) =>
          parseInt(arc),
        );
      } else {
        res.locals.excludedArcsNum = [];
      }

      return next();
    } catch (error) {
      console.log('something went wrong in preGenPlaylist: ', error);
      return next(error);
    }
  },
  /**
   * the preliminary query that gets a list of episodes that contains the excluded arcs, to be passed along to the generate playlist function.
   * @returns nothing
   */
  getExcludedArcEpisodes: async (req, res, next) => {
    try {
      const { excludedArcsNum, excludedSeasonsNum } = res.locals;

      if (excludedArcsNum.length) {
        const localsArray: any = [excludedSeasonsNum, excludedArcsNum];
        let paramsNumber = 1;

        const paramsArray: any = localsArray.map((prop: any[]) => {
          return prop.map(() => {
            const paramIndex = '$' + `${paramsNumber}`;
            paramsNumber++;
            return paramIndex;
          });
        });

        const arcsQuery = {
          text: `SELECT DISTINCT episodes_arcs.episode_id 
          FROM episodes_arcs 
          JOIN episodes ON episodes.episode_id = episodes_arcs.episode_id 
          JOIN seasons ON episodes.season_id = seasons.season_id 
          WHERE seasons.season_id NOT IN (${paramsArray[0].join(',')}) 
          AND episodes_arcs.arc_id IN (${paramsArray[1].join(
            ',',
          )}) ORDER BY episode_id DESC`,
          values: [...excludedSeasonsNum, ...excludedArcsNum],
        };

        const results: any = await query(arcsQuery.text, arcsQuery.values);

        res.locals.excludedEpisodeIDs = results.rows.map(
          (row: episodeArcIdRow) => {
            return row.episode_id;
          },
        );
      } else {
        res.locals.excludedEpisodeIDs = [0];
      }
      return next();
    } catch (error) {
      console.log('something went wrong in getExludedArcEpisodes: ', error);
      return next(error);
    }
  },
  getPlaylist: async (req, res, next) => {
    try {
      const { playlistLength } = req.body;

      const { excludedSeasonsNum, excludedEpisodeIDs, excludedSeriesIDs } =
        res.locals;

      console.log(
        'getPlaylist queried, playlistLength: ',
        playlistLength,
        'excludedEpisodesArcs: ', // arc_id
        excludedEpisodeIDs,
        'excludedSeries: ', // series_name
        excludedSeriesIDs,
        'excludedSeasons: ', // seasonId
        excludedSeasonsNum,
      );

      const localsArray: any = [
        excludedSeasonsNum,
        excludedSeriesIDs,
        excludedEpisodeIDs,
        [playlistLength],
      ];
      let paramsNumber = 1;

      const paramsArray: any = localsArray.map((localsProperty: any[]) => {
        return localsProperty.map(() => {
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
        JOIN episode_series
        ON episodes.episode_id = episode_series.episode_id
        WHERE seasons.season_id NOT IN (${paramsArray[0].join(',')})
        AND
        episode_series.series_id NOT IN (${paramsArray[1].join(',')})
        AND
        episodes.episode_id NOT IN (${paramsArray[2].join(',')})
        ORDER BY RANDOM()
        LIMIT ${paramsArray[3][0]}`,
        values: [
          ...excludedSeasonsNum,
          ...excludedSeriesIDs,
          ...excludedEpisodeIDs,
          playlistLength,
        ],
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
      console.log('Error in getPlaylistArcs: ', error);
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
      console.log('Error in getPlaylistSeries: ', error);
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
      console.log('Error in getEpisode: ', error);
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
      const allEpisodeQuery = 'SELECT * FROM episodes ORDER BY episode_number';
      const result: any = await query(allEpisodeQuery);
      res.locals.episodeList = result.rows;
      return next();
    } catch (error) {
      console.error('Error in getAllEpisodes: ', error);
      return next(error);
    }
  },
  getWatchedEpisodes: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in getWatchedEpisodes: ', error);
      return next(error);
    }
  },
  updateWatched: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in updateWatched: ', error);
      return next(error);
    }
  },
  updateFavorite: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in updateFavorite: ', error);
      return next(error);
    }
  },
  addEpisode: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in addEpisode: ', error);
      return next(error);
    }
  },
  getCardData: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in getCardData: ', error);
      return next(error);
    }
  },
  updateEpisode: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in updateEpisode: ', error);
      return next(error);
    }
  },
  deleteEpisode: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in deleteEpisode: ', error);
      return next(error);
    }
  },
  getUserPlaylist: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
  getUserEpisodeData: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
  markEpisode: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
  getEpisodeRequests: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
  addToPlaylist: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
  addToUserPlaylist: async (req, res, next) => {
    try {
      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
};


export default episodeController;
