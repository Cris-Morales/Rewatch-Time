import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import episodeController from '../controllers/episodeController';

const episodesRouter = express.Router();

/**
 * @abstract If the user wants to replace a card in the playlist
 * Is there a way i can just grab the previous list and randomly
 * pull a card from there instead?
 */
episodesRouter.get(
  '/card',
  episodeController.getEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.cardData);
  },
);

/**
 * @abstract main playlist generator
 */
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

/**
 * @abstract Get all episodes
 * would be great to be able to add episodes from here to the
 * playlist
 */
episodesRouter.get(
  '/allEpisodes',
  episodeController.getAllEpisodes,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.episodeList);
  },
);

export default episodesRouter;
