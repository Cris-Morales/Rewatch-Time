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

export interface playlistAPIResponse {
  playlist: episodeCard[];
}
