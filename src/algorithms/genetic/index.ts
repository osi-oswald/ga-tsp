/*
TODO:
- elitism
- crossover: by order 1
- mutation: by swapping
 */

import { Point } from '../utils/points';
import { City } from '../utils/cities';
import { shuffle } from '../utils';

export function findPathByGeneticClassic(args: {
  populationSize: number;
  cities: City[];
}): Point[] {
  let endcondition = false;

  let population = [];
  for (let i = 0; i < args.populationSize; i++) {
    let candidate = shuffle(args.cities);
  }

  while (!endcondition) {}

  return null as any;
}
