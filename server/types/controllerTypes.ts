import { Request, Response, NextFunction } from 'express';

export interface UserController {
    createNewUser: (req: Request, res: Response, next: NextFunction) => void;
    initializeWatchList: (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => void;
    loginUser: (req: Request, res: Response, next: NextFunction) => void;
    getUsername: (req: Request, res: Response, next: NextFunction) => void;
    isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
    deleteUser: (req: Request, res: Response, next: NextFunction) => void;
    updateUserIcon: (req: Request, res: Response, next: NextFunction) => void;
    getUserIcon: (req: Request, res: Response, next: NextFunction) => void;
    rememberUser: (req: Request, res: Response, next: NextFunction) => void;
}

export interface EpisodeController {
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
    getUserEpisodeData: (req: Request, res: Response, next: NextFunction) => void;
    getWatchedEpisodes: (req: Request, res: Response, next: NextFunction) => void;
    updateWatched: (req: Request, res: Response, next: NextFunction) => void;
    updateFavorite: (req: Request, res: Response, next: NextFunction) => void;
    addEpisode: (req: Request, res: Response, next: NextFunction) => void;
    updateEpisode: (req: Request, res: Response, next: NextFunction) => void;
    deleteEpisode: (req: Request, res: Response, next: NextFunction) => void;
    getUserPlaylist: (req: Request, res: Response, next: NextFunction) => void;
    addToUserPlaylist: (req: Request, res: Response, next: NextFunction) => void;
    addToPlaylist: (req: Request, res: Response, next: NextFunction) => void;
    //---------------------------------------------------------------------------
    markEpisode: (req: Request, res: Response, next: NextFunction) => void;
    getEpisodeRequests: (req: Request, res: Response, next: NextFunction) => void;
}

export interface sqlQuery {
    text: string;
    values: any[];
}

export interface arcRow {
    arc: string;
    arc_id: number;
}

export interface seriesRow {
    series_name: string;
}

export interface seasonsData {
    series_name: string;
    season_number: number;
    season_id: number;
}

export interface seriesIdRow {
    series_id: number;
}

export interface episodeArcIdRow {
    episode_id: number;
}

export interface seasonsRow {
    season_number: number;
    series_name: string;
    season_id: number;
}

export interface episodeColumns {
    episode_number: string | null;
    title: string | null;
    synopsis: string | null;
    airdate: string | null;
    season_id: string | null;
    season_episode: string | null;
    episode_card_path: string | null;
    [key: string]: any;
}