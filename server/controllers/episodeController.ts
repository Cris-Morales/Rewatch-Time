import { Request, Response, NextFunction, RequestHandler } from 'express';

import { query } from '../db/model.js';

interface EpisodeController {
  getEpisode: (req: Request, res: Response, next: NextFunction) => void;
  getPlaylist: (req: Request, res: Response, next: NextFunction) => void;
}

// {
//   title: string; - episodes
//   series: string[]; - join
//   season: number; - episodes
//   seasonEpisode: number; - episodes
//   overallEpisode: number; - episodes
//   arcs: string[]; - join
//   synopsis: string; - episodes
//   episodeCard: string; - episodes
// forgot airdate but whatever
// }

const episodeController: EpisodeController = {
  getEpisode: async (req, res, next) => {
    try {
      const episodeQuery = 'SELECT * FROM episodes where episode_id = 1';
      const result = await query(episodeQuery);
      res.locals.cardData = result.rows[0];
      return next();
    } catch (error) {
      console.log('something went wrong: ', error);
      return next(error);
    }
  },
  getPlaylist: async (req, res, next) => {},
};

export default episodeController;
