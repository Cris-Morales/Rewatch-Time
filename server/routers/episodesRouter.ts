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
 * @abstract main playlist generator for anonymous user
 */
episodesRouter.get('/genPlaylist',
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
 * need to add the playlist arcs, and series to this to get the same data as the episode cards
 */
episodesRouter.get('/allEpisodes',
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
episodesRouter.get('/arcs',
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
episodesRouter.get('/series',
  episodeController.getAllSeries,
  (req: Request, res: Response): Response => {
    // console.log('Get All Series Success');
    return res.status(200).send(res.locals.dbSeriesList);
  },
);

/**
 * @abstract Get all seasons
 * used for a drop down menu that specifies seasons in the series chosen to exclude
 */
episodesRouter.get('/seasons',
  episodeController.getAllSeasons,
  (req: Request, res: Response): Response => {
    // console.log('Get All Seasons Success');
    return res.status(200).send(res.locals.dbSeasonsList);
  },
);

/**
 * @abstract update user's singular episode watched column
 */
episodesRouter.put('/updateEpisodeWatched',
  protect,
  episodeController.updateWatched,
  (req: Request, res: Response): Response => {
    console.log('Success: User Episode Data Updated');
    return res.status(200).json('success!');
  },
);

/**
 * @abstract update user's singular episode favorite column
 */
episodesRouter.put('/updateEpisodeFavorite',
  protect,
  episodeController.updateFavorite,
  (req: Request, res: Response): Response => {
    console.log('Success');
    console.log('Success: User Episode Data Updated');
    return res.status(200).send('success!');
  },
);

/**
 * @abstract generate a playlist for a logged in user
 */
episodesRouter.get('/genUserPlaylist',
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

/**
 * @abstract get list of user's full episode data
 * Note: implement pagination for large datasets such as this.
 */
episodesRouter.get('/userEpisodes',
  protect,
  episodeController.getUserEpisodeData,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).json(res.locals.playlistData);
  },
);

/**
 * @abstract get list of user's watched episodes
 */
episodesRouter.get('/userWatchedEpisodes',
  protect,
  episodeController.getWatchedEpisodes,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).json(res.locals.playlistData);
  },
)

episodesRouter.post('/database',
  protect,
  episodeController.addEpisode,
  episodeController.markEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).json("success!");
  },
);

episodesRouter.get('/database',
  protect,
  episodeController.getEpisode,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).json(res.locals.playlistData);
  },
);

episodesRouter.put('/database',
  protect,
  episodeController.updateEpisode,
  // episodeController.markEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send('Success');
  },
);

episodesRouter.delete('/database',
  protect,
  episodeController.deleteEpisode,
  // episodeController.markEpisode,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send('Success');
  },
);

episodesRouter.get('/addToUserPlaylist',
  protect,
  episodeController.preGenPlaylist,
  episodeController.getExcludedArcEpisodes,
  episodeController.addToUserPlaylist,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.playlistData);
  },
);

episodesRouter.get('/addToPlaylist',
  episodeController.preGenPlaylist,
  episodeController.getExcludedArcEpisodes,
  episodeController.addToPlaylist,
  episodeController.getPlaylistArcs,
  episodeController.getPlaylistSeries,
  (req: Request, res: Response): Response => {
    console.log('Success');
    return res.status(200).send(res.locals.playlistData);
  },
);



export default episodesRouter;
