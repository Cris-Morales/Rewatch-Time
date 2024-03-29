export interface LoginData {
  username: string;
  password: string;
  remember: boolean;
}

export interface episodeCard {
  title: string;
  series: string[];
  season: number;
  seasonEpisode: number;
  overallEpisode: number;
  arcs: string[];
  synopsis: string;
  episodeCard: string;
  // watched: boolean; only added when I implement users
}

export interface arcs {
  arc: string[];
}

export interface playlistAPIResponse {
  playlist: episodeCard[];
}

export interface seriesList {
  series: string;
  series_id: number;
}

export interface seasonSeriesList {
  seasons: number[];
}

export interface seasonsRow {
  series_name: string;
  season_number: number;
  season_id: number;
}

export interface usernameRequest {
  username: string;
}

export interface loginRequest {
  id: string;
}
