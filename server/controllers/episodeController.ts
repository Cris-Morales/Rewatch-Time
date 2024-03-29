import { query } from '../db/model.js';
import { EpisodeController, sqlQuery, arcRow, seriesRow, seasonsData, seriesIdRow, episodeArcIdRow, seasonsRow, episodeColumns } from '../types/controllerTypes.js'

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
        res.locals.excludedSeriesIDs = excludedSeriesArray.map((series: string) =>
          parseInt(series)
        );
      } else {
        res.locals.excludedSeriesIDs = [0];
      }

      if (excludedSeasons.length) {
        res.locals.excludedSeasonsNum = excludedSeasonsArray.map((season: string) =>
          parseInt(season)
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
      const playlistLength = req.query.playlistLength as string;
      const playlistLengthNum = parseInt(playlistLength)

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
  getUserPlaylist: async (req, res, next) => {
    try {
      const user_id = res.locals.userData.id
      const playlistLength = req.query.playlistLength as string;
      const type = req.query.type as string
      const queryType: number = parseInt(type); // Watched Only: 0, Unwatched Only: 1, Any: 2

      const playlistLengthNum = parseInt(playlistLength)

      const { excludedSeasonsNum, excludedEpisodeIDs, excludedSeriesIDs } =
        res.locals;

      console.log(
        'getUserPlaylist queried, playlistLength: ',
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
        [playlistLengthNum],
        [user_id]
      ];
      let paramsNumber = 1;

      const paramsArray: any = localsArray.map((localsProperty: any[]) => {
        return localsProperty.map(() => {
          const paramIndex = '$' + `${paramsNumber}`;
          paramsNumber++;
          return paramIndex;
        });
      });

      const queryModifier = function (): string {
        let queryStatement = ''
        switch (queryType) {
          case 0:
            console.log('0')
            queryStatement = 'AND users_episodes_watched.watched = true';
            break
          case 1:
            console.log('1')
            queryStatement = 'AND users_episodes_watched.watched = false';
            break
        }
        return queryStatement
      }();

      const playlistQuery = {
        text: `SELECT episodes.episode_id, title, season_number, season_episode, episode_number, episode_card_path, airdate, synopsis
        FROM episodes
        JOIN seasons
        ON episodes.season_id = seasons.season_id
        JOIN episode_series
        ON episodes.episode_id = episode_series.episode_id
        JOIN users_episodes_watched
        ON users_episodes_watched.episode_id = episodes.episode_id
        WHERE seasons.season_id NOT IN (${paramsArray[0].join(',')})
        AND
        episode_series.series_id NOT IN (${paramsArray[1].join(',')})
        AND
        episodes.episode_id NOT IN (${paramsArray[2].join(',')})
        ${queryModifier}
        AND user_id = ${paramsArray[4][0]}
        ORDER BY RANDOM()
        LIMIT ${paramsArray[3][0]}`,
        values: [
          ...excludedSeasonsNum,
          ...excludedSeriesIDs,
          ...excludedEpisodeIDs,
          playlistLength,
          user_id
        ],
      };

      const result: any = await query(playlistQuery.text, playlistQuery.values);
      res.locals.playlistData = result.rows;
      console.log(result.rows)
      next();
    } catch (error) {
      console.error('Error in : ', error);
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
  addToPlaylist: async (req, res, next) => {
    try {
      // passed query params back into this query, along with the list of current episodes, 
      const currPlaylistStr = req.query.currPlaylist as string;
      const currPlaylistNums: any[] = currPlaylistStr.split(',');
      currPlaylistNums.map((playlistID: string) => {
        parseInt(playlistID);
      })


      const { excludedSeasonsNum, excludedEpisodeIDs, excludedSeriesIDs } =
        res.locals;
      excludedEpisodeIDs.push(...currPlaylistNums)

      console.log(
        'addToPlaylist queried, currPlatlist: ',
        currPlaylistNums,
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
        excludedEpisodeIDs
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
        and
        ORDER BY RANDOM()
        LIMIT 1`,
        values: [
          ...excludedSeasonsNum,
          ...excludedSeriesIDs,
          ...excludedEpisodeIDs,
        ],
      };

      const result: any = await query(playlistQuery.text, playlistQuery.values);
      res.locals.playlistData = result.rows;



      next();
    } catch (error) {
      console.error('Error in addToPlaylist: ', error);
      return next(error);
    }
  },
  addToUserPlaylist: async (req, res, next) => {
    try {
      const currPlaylistStr = req.query.currPlaylist as string;
      const currPlaylistNums: string[] = currPlaylistStr.split(',');
      currPlaylistNums.map((episodeID: string) => {
        parseInt(episodeID);
      })
      const user_id = res.locals.userData.id
      const type = req.query.type as string
      const queryType: number = parseInt(type); // Watched Only: 0, Unwatched Only: 1, Any: 2

      const { excludedSeasonsNum, excludedEpisodeIDs, excludedSeriesIDs } =
        res.locals;

      excludedEpisodeIDs.push(...currPlaylistNums)

      console.log(
        'addToUserPlaylist queried excludedEpisodesArcs: ', // arc_id
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
        [user_id]
      ];
      let paramsNumber = 1;

      const paramsArray: any = localsArray.map((localsProperty: any[]) => {
        return localsProperty.map(() => {
          const paramIndex = '$' + `${paramsNumber}`;
          paramsNumber++;
          return paramIndex;
        });
      });

      const queryModifier = function (): string {
        let queryStatement = ''
        switch (queryType) {
          case 0:
            console.log('0')
            queryStatement = 'AND users_episodes_watched.watched = true';
            break
          case 1:
            console.log('1')
            queryStatement = 'AND users_episodes_watched.watched = false';
            break
        }
        return queryStatement
      }();

      const playlistQuery = {
        text: `SELECT episodes.episode_id, title, season_number, season_episode, episode_number, episode_card_path, airdate, synopsis
        FROM episodes
        JOIN seasons
        ON episodes.season_id = seasons.season_id
        JOIN episode_series
        ON episodes.episode_id = episode_series.episode_id
        JOIN users_episodes_watched
        ON users_episodes_watched.episode_id = episodes.episode_id
        WHERE seasons.season_id NOT IN (${paramsArray[0].join(',')})
        AND
        episode_series.series_id NOT IN (${paramsArray[1].join(',')})
        AND
        episodes.episode_id NOT IN (${paramsArray[2].join(',')})
        ${queryModifier}
        AND user_id = ${paramsArray[3][0]}
        ORDER BY RANDOM()
        LIMIT 1`,
        values: [
          ...excludedSeasonsNum,
          ...excludedSeriesIDs,
          ...excludedEpisodeIDs,
          user_id
        ],
      };

      const result: any = await query(playlistQuery.text, playlistQuery.values);
      res.locals.playlistData = result.rows;
      console.log(result.rows)
      next();
    } catch (error) {
      console.error('Error in addToUserPlaylist: ', error);
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
      const seriesQuery = 'SELECT series_name, series_id FROM series';
      const result: any = await query(seriesQuery);
      const seriesArray: string[] = result.rows.map((row: seriesRow) => {
        const series_name = row.series_name.replace(
          /\w\S*/g,
          function (txt: string) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
          },
        );
        return { series_name: series_name, series_id: row.series_id }
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
        'SELECT season_number, series_name, season_id, seasons.series_id FROM seasons JOIN series ON series.series_id = seasons.series_id';
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
      console.log('Error in getAllSeasons: ', error);
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
      const user_id = res.locals.userData.id

      const getWatchedEpisodesQuery: string = `SELECT episodes.episode_id, users_episodes_watched.id, title, season_number, season_episode, episode_number, episode_card_path, airdate, synopsis, watched, favorite
      FROM episodes
      JOIN seasons
      ON episodes.season_id = seasons.season_id
      JOIN episode_series
      ON episodes.episode_id = episode_series.episode_id
      JOIN users_episodes_watched
      ON episodes.episode_id = users_episodes_watched.episode_id
      WHERE user_id = $1
      AND
      users_episodes_watched.watched = true
      ORDER BY episodes.episode_number`

      const results: any = await query(getWatchedEpisodesQuery, [user_id])
      res.locals.playlistData = results.rows

      // playlistData so we can use get all seasons, get all series, and get all arcs
      next();
    } catch (error) {
      console.error('Error in getWatchedEpisodes: ', error);
      return next(error);
    }
  },
  updateWatched: async (req, res, next) => {
    try {
      const user_id = res.locals.userData.id;
      const { watched, episode_id } = req.body;

      console.log(watched, episode_id);

      const updateWatchedquery: sqlQuery = {
        text: 'UPDATE users_episodes_watched SET watched = $1 WHERE episode_id = $2 AND user_id = $3',
        values: [watched, episode_id, user_id]
      }

      const results: any = query(updateWatchedquery.text, updateWatchedquery.values);

      next();
    } catch (error) {
      console.error('Error in updateWatched: ', error);
      return next(error);
    }
  },
  updateFavorite: async (req, res, next) => {
    try {
      const user_id = res.locals.userData.id;
      const { favorite, episode_id } = req.body;

      console.log(favorite, episode_id);

      const updateFavoritequery: sqlQuery = {
        text: 'UPDATE users_episodes_watched SET favorite = $1 WHERE episode_id = $2 AND user_id = $3',
        values: [favorite, episode_id, user_id]
      }

      const results: any = query(updateFavoritequery.text, updateFavoritequery.values);
      next();
    } catch (error) {
      console.error('Error in updateFavorite: ', error);
      return next(error);
    }
  },
  getUserEpisodeData: async (req, res, next) => {
    try {
      const user_id = res.locals.userData.id

      const userEpisodeDataQuery: sqlQuery = {
        text: `SELECT episodes.episode_id, users_episodes_watched.id, title, season_number, season_episode, episode_number, episode_card_path, airdate, synopsis, watched, favorite
      FROM episodes
      JOIN seasons
      ON episodes.season_id = seasons.season_id
      JOIN episode_series
      ON episodes.episode_id = episode_series.episode_id
      JOIN users_episodes_watched
      ON episodes.episode_id = users_episodes_watched.episode_id
      WHERE user_id = $1
      ORDER BY episodes.episode_number`,
        values: [user_id]
      }


      const results: any = await query(userEpisodeDataQuery.text, userEpisodeDataQuery.values)
      res.locals.playlistData = results.rows

      next();
    } catch (error) {
      console.error('Error in : ', error);
      return next(error);
    }
  },
  addEpisode: async (req, res, next) => {
    try {
      const { episode_number, episode_title, episode_synopsis, episode_airdate, episode_season,
        seasonEpisode, series_id, arcs } = req.body
      const addEpisodeQuery: sqlQuery = {
        text: 'INSERT INTO episodes(episode_number, title, synopsis, airdate, season_id, season_episode) VALUES ($1, $2, $3, $4, $5, $6)RETURNING episode_id',
        values: [
          episode_number,
          episode_title,
          episode_synopsis,
          episode_airdate,
          episode_season,
          seasonEpisode,
        ],
      }

      const episodeResult: any = await query(addEpisodeQuery.text, addEpisodeQuery.values);

      console.log('Data inserted:', episodeResult.rows);

      const seriesQuery: sqlQuery = {
        text: 'INSERT INTO episode_series(series_id, episode_id) VALUES ($1, $2);',
        values: [
          series_id,
          episodeResult.rows[0].episode_id
        ],
      }

      const arcsQuery: string = 'INSERT INTO episodes_arcs(arc_id, episode_id) VALUES ($1, $2);';

      if (series_id) {
        const seriesResults: any = await query(seriesQuery.text, seriesQuery.values);
      }

      if (arcs.length) {
        arcs.forEach(async (arc: any) => {
          const arcResults: any = await query(arcsQuery, [arc, episodeResult.rows[0].episode_id])
        })
      }

      next();
    } catch (error) {
      console.error('Error in addEpisode: ', error);
      return next(error);
    }
  },
  getEpisode: async (req, res, next) => {
    try {
      const episode_id_string = req.query.episode_id as string;
      const episode_id: number = parseInt(episode_id_string);

      const result: any = await query('SELECT * FROM episodes WHERE episode_id = $1', [episode_id]);
      res.locals.playlistData = [result.rows[0]];

      return next();
    } catch (error) {
      console.log('Error in getEpisode: ', error);
      return next(error);
    }
  },
  updateEpisode: async (req, res, next) => {
    try {
      const episode_id = req.body.episode_id as string;
      const changes = req.body.changes as episodeColumns;

      for (let column in changes) {
        const updateEpisodeQuery: sqlQuery = {
          text: `UPDATE episodes SET ${column} = $1 WHERE episode_id = $2;`,
          values: [changes[column], episode_id]
        }
        if (changes[column]) {
          const results: any = await query(updateEpisodeQuery.text, updateEpisodeQuery.values);
        }
      }

      next();
    } catch (error) {
      console.error('Error in updateEpisode: ', error);
      return next(error);
    }
  },
  deleteEpisode: async (req, res, next) => {
    try {
      const { episode_id } = req.body;

      const queryArray: string[] = [
        'DELETE FROM episodes_arcs WHERE episode_id = $1;', 'DELETE FROM episode_series WHERE episode_id = $1;', 'DELETE FROM episodes WHERE episode_id = $1;'
      ]
      const resultArray: any[] = []

      queryArray.forEach(async (queryStr: string) => {
        const deleteEpisode: any = await query(queryStr, [episode_id]);
      })

      console.log('episode deleted: ', episode_id);

      next();
    } catch (error) {
      console.error('Error in deleteEpisode: ', error);
      return next(error);
    }
  },
  markEpisode: async (req, res, next) => {
    try {
      // requires a new table
      next();
    } catch (error) {
      console.error('Error in markEpisode: ', error);
      return next(error);
    }
  },
  getEpisodeRequests: async (req, res, next) => {
    try {
      // requires a new table

      next();
    } catch (error) {
      console.error('Error in getEpisodeRequests: ', error);
      return next(error);
    }
  },
};

export default episodeController;
