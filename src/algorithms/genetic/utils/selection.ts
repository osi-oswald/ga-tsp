import { randomExclusive } from '../../common';
import { Chromosome, binarySearchAsc } from './index';
import { fitnessSym } from './fitness';

// @ts-ignore
window.binarySearchAsc = binarySearchAsc;
// @ts-ignore
window.fit = fitnessSym;

export function pickRoulette<T>(
  population: Chromosome<T>[],
  populationFitness: number,
  exclude?: Chromosome<T>
): Chromosome<T> {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }

  if (exclude) {
    let index = binarySearchAsc(population, exclude, c => c[fitnessSym]);
    while (population[index++] === exclude) {
      populationFitness -= exclude[fitnessSym];
    }
  }

  let accumulator = 0;
  const pick = randomExclusive(populationFitness);
  for (const candidate of population) {
    if (candidate !== exclude) {
      accumulator += candidate[fitnessSym];
      if (pick < accumulator) {
        return candidate;
      }
    }
  }

  throw new Error('pickRoulette: this should never happen ;-)');
}
