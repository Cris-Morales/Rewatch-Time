import { QueryFunction } from '@tanstack/react-query';
import { episodeCard } from './APIResponseTypes.js';

const fetchPlaylist: QueryFunction<
  episodeCard,
  ['genPlaylist', number, string[], string[], string[]]
> = async ({ queryKey }) => {
  const playlistLength: number = queryKey[1];
  const excludedArcs: string[] = queryKey[2];
  const excludedSeries: string[] = queryKey[3];
  const excludedSeasons: string[] = queryKey[4];

  // Trying post so I have access to types
  // const res = await fetch(
  //   `/adventuretime/episodes/genPlaylist?playlistLength=${playlistLength}&excludedArcs=${excludedArcs}&excludedSeries=${excludedSeries}&excludedSeasons=${excludedSeasons}`,
  // );

  const res = await fetch(`/api/episodes/genPlaylist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playlistLength,
      excludedArcs,
      excludedSeries,
      excludedSeasons,
    }),
  });

  if (!res.ok) {
    throw new Error(`Error in fetchPlaylist`);
  }

  return res.json();
};

export default fetchPlaylist;
