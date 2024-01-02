export interface LoginData {
  username: string;
  password: string;
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
  series: string[];
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
