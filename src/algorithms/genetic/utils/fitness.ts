import { pathLength, Point } from '../../common/points';
import { Chromosome } from './index';

export function fitness(path: Point[]): number {
  return pathLength(path);
}

export const fitnessSym = Symbol('fitness');

export function addFitness<T extends Point>(candidate: T[]): Chromosome<T> {
  candidate[fitnessSym] = fitness(candidate);
  return candidate as Chromosome<T>;
}

export const fitnessDesc = (a: Chromosome, b: Chromosome) => b[fitnessSym] - a[fitnessSym];
