import { pathLength, Point } from '../../common/points';
import { Chromosome, Gene } from './index';

export function fitness(path: Point[]): number {
  return 1 / pathLength(path);
}

export const fitnessSym = Symbol('fitness');

export function addFitness<T extends Point>(candidate: Gene<T>[]): Chromosome<T> {
  candidate[fitnessSym] = fitness(candidate);
  return candidate as Chromosome<T>;
}
