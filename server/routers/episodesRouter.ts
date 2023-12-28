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

// those last 2 routes are a little experimental. I want to play with how the user can
// add some specifics to their playlist. Sometimes I just want to watch jake episodes
// sometimes marceline
// I want to give the user the ability to do that
// maybe they just want to binge a season
// idk, I just want to make the algo interesting.
// the include exclude is the tricky part.

export default episodesRouter;
