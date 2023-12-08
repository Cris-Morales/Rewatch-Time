import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchPlaylist: QueryFunction<
  episodeCard,
  ['genPlaylist', number, boolean]
> = async ({ queryKey }) => {
  const playlistLength: number = queryKey[1];
  const finale: boolean = queryKey[2];

  const res = await fetch(
    `/api/genPlaylist?playlistLength=${playlistLength}&finale=${finale}`,
  );

  if (!res.ok) {
    throw new Error(`Aw buns, cards fetch not ok`);
  }

  return res.json();
};

export default fetchPlaylist;
