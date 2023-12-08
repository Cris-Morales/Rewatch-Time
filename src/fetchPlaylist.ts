import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchPlaylist: QueryFunction<
  episodeCard,
  ['genPlaylist', number]
> = async ({ queryKey }) => {
  const playlistLength: number = queryKey[1];
  const finale: boolean = true;

  const res = await fetch(
    `/api/genPlaylist?playlistLength=${playlistLength}&finale=${finale}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Aw buns, cards fetch not ok`);
  }

  return res.json();
};

export default fetchPlaylist;
