import { Chromosome } from './index';

export function crossoverOrder1<T>(parent1: Chromosome<T>, parent2: Chromosome<T>): [T[], T[]] {
  return [parent1, parent2];
}
