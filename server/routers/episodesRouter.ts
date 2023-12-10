import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import episodeController from '../controllers/episodeController';

const episodesRouter = express.Router();

episodesRouter.get(
  '/card',
  episodeController.getEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.cardData);
  },
);

episodesRouter.get(
  '/genPlaylist',
  episodeController.getPlaylist,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.playlistData);
  },
);

episodesRouter.get(
  '/allEpisodes',
  episodeController.getAllEpisodes,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.episodeList);
  },
);

export default episodesRouter;
