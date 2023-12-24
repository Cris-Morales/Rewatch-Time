import { QueryFunction } from '@tanstack/react-query';
import { arcs } from './APIResponseTypes';

const fetchArcList: QueryFunction<arcs, ['arcs']> = async () => {
  const res = await fetch(`/adventuretime/episodes/arcs`);

  if (!res.ok) {
    throw new Error(`Aw buns, arcs fetch not ok.`);
  }

  return res.json();
};

export default fetchArcList;
