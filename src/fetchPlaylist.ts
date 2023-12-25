import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchPlaylist: QueryFunction<
  episodeCard,
  ['genPlaylist', number, boolean, string[]]
> = async ({ queryKey }) => {
  const playlistLength: number = queryKey[1];
  const finale: boolean = queryKey[2];
  const excludedArcs: string = queryKey[3].join(',');

  const res = await fetch(
    `/adventuretime/episodes/genPlaylist?playlistLength=${playlistLength}&finale=${finale}&excludeArcs=${excludedArcs}`,
  );

  if (!res.ok) {
    throw new Error(`Aw buns, cards fetch not ok`);
  }

  return res.json();
};

export default fetchPlaylist;
