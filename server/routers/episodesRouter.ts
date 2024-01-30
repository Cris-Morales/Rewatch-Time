import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import episodeController from '../controllers/episodeController';
import { protect } from '../utils/auth';
import userController from '../controllers/userController';
const episodesRouter = express.Router();

/**
 * @abstract main playlist generator
 */
episodesRouter.get(
  '/genPlaylist',
  episodeController.preGenPlaylist,
  episodeController.getExcludedArcEpisodes,
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
 */
episodesRouter.get(
  '/allEpisodes',
  episodeController.getAllEpisodes,
  (req: Request, res: Response): Response => {
    console.log('Get All Episodes Success');
    return res.status(200).send(res.locals.episodeList);
  },
);

/**
 * @abstract Get all arcs
 * used for a drop down menu that specifies arcs to exclude from the playlist
 */
episodesRouter.get(
  '/arcs',
  episodeController.getAllArcs,
  (req: Request, res: Response): Response => {
    // console.log('Get All Arcs Success');
    return res.status(200).send(res.locals.currentArcList);
  },
);

/**
 * @abstract Get all series
 * used for a drop down menu that specifies series to exclude from the playlist
 */
episodesRouter.get(
  '/series',
  episodeController.getAllSeries,
  (req: Request, res: Response): Response => {
    // console.log('Get All Series Success');
    return res.status(200).send(res.locals.dbSeriesList);
  },
);

/**
 * @abstract Get all arcs
 * used for a drop down menu that specifies seasons in the series chosen to exclude
 */
episodesRouter.get(
  '/seasons',
  episodeController.getAllSeasons,
  (req: Request, res: Response): Response => {
    // console.log('Get All Seasons Success');
    return res.status(200).send(res.locals.dbSeasonsList);
  },
);

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

episodesRouter.put(
  '/updateEpisodeWatched',
  protect,
  episodeController.updateWatched,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.put(
  '/updateEpisodeFavorite',
  protect,
  episodeController.updateFavorite,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.get(
  '/genUserPlaylist',
  protect,
  episodeController.preGenPlaylist,
  episodeController.getExcludedArcEpisodes,
  episodeController.getUserPlaylist,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.playlistData);
  },
);

episodesRouter.put(
  '/userEpisodes',
  protect,
  episodeController.getUserEpisodeData,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).json(res.locals.episodeData);
  },
);

episodesRouter.post(
  '/database',
  protect,
  episodeController.addEpisode,
  episodeController.markEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.get(
  '/database',
  protect,
  episodeController.getEpisodeRequests,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.put(
  '/database',
  protect,
  episodeController.updateEpisode,
  episodeController.markEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.delete(
  '/database',
  protect,
  episodeController.deleteEpisode,
  episodeController.markEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.get(
  '/addToUserPlaylist',
  protect,
  episodeController.preGenPlaylist,
  episodeController.addToUserPlaylist,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

episodesRouter.delete(
  '/addToPlaylist',
  episodeController.preGenPlaylist,
  episodeController.addToPlaylist,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200);
  },
);

export default episodesRouter;
