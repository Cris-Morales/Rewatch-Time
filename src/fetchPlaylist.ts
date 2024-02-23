import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchPlaylist: QueryFunction<
  episodeCard,
  ['genPlaylist', number, number[], number[], number[]]
> = async ({ queryKey }) => {
  const playlistLength: number = queryKey[1];
  const excludedArcs: number[] = queryKey[2];
  const excludedSeries: number[] = queryKey[3];
  const excludedSeasons: number[] = queryKey[4];

  const res = await fetch(
    `/adventuretime/episodes/genPlaylist?playlistLength=${playlistLength}&excludedArcs=${excludedArcs}&excludedSeries=${excludedSeries}&excludedSeasons=${excludedSeasons}`
  );

  if (!res.ok) {
    throw new Error(`Error in fetchPlaylist`);
  }

  return res.json();
};

export default fetchPlaylist;
