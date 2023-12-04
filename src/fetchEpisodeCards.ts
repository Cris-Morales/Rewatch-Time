import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchEpisodeCards: QueryFunction<
  episodeCard,
  ['episode', number]
> = async ({ queryKey }) => {
  // query logic here

  const id = queryKey[1];

  // const res = await fetch(`/genPlaylist?id=${id}`);
  const res = await fetch(`/api/`);

  if (!res.ok) {
    throw new Error(`Aw buns, cards fetch not ok`);
  }

  return res.json();
};

export default fetchEpisodeCards;
