import { QueryFunction } from '@tanstack/react-query';
import { seriesList, arcs, seasonSeriesList } from './APIResponseTypes';

export const fetchSeriesList: QueryFunction<
  seriesList,
  ['series']
> = async () => {
  const res = await fetch(`/api/episodes/series`);

  if (!res.ok) {
    throw new Error(`Aw buns, series fetch not ok.`);
  }
  return res.json();
};

export const fetchArcList: QueryFunction<arcs, ['arcs']> = async () => {
  const res = await fetch(`/api/episodes/arcs`);

  if (!res.ok) {
    throw new Error(`Aw buns, arcs fetch not ok.`);
  }

  return res.json();
};

export const fetchSeasonList: QueryFunction<
  seasonSeriesList,
  ['seasons']
> = async () => {
  const res = await fetch(`/api/episodes/seasons`);

  if (!res.ok) {
    throw new Error(`Aw buns, arcs fetch not ok.`);
  }

  return res.json();
};
