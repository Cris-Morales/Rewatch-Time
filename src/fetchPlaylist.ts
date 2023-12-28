import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchPlaylist: QueryFunction<
  episodeCard,
  ['genPlaylist', number, string[], string[], string[]]
> = async ({ queryKey }) => {
  const playlistLength: number = queryKey[1];
  const excludedArcs: string = queryKey[2].join(', ').toLocaleLowerCase();
  const excludedSeries: string = queryKey[3].join(', ').toLocaleLowerCase();
  const excludedSeasons: string = queryKey[4].join(', ');

  const res = await fetch(
    `/adventuretime/episodes/genPlaylist?playlistLength=${playlistLength}&excludedArcs=${excludedArcs}&excludedSeries=${excludedSeries}&excludedSeasons=${excludedSeasons}`,
  );

  if (!res.ok) {
    throw new Error(`Aw buns, cards fetch not ok`);
  }

  return res.json();
};

export default fetchPlaylist;
