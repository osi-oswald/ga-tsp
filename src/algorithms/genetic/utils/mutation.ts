import { Chromosome } from './index';
import { randomExclusive } from '../../common';

export function mutateSwap1<T>(candidate: Chromosome<T>): T[] {
  const length = candidate.length;
  if (length < 2) {
    throw new Error('mutateSwap1: chromosome length must be > 1');
  }

  const index = randomExclusive(length);
  const indexNext = (index + 1) % length;

  const clone = [...candidate];
  clone[index] = candidate[indexNext];
  clone[indexNext] = candidate[index];

  return clone;
}
