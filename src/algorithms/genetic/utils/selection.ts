import { binarySearchAsc, Chromosome } from './index';
import { fitnessSym } from './fitness';

// @ts-ignore
window.binarySearchAsc = binarySearchAsc;
// @ts-ignore
window.fit = fitnessSym;

export function pickRoulette<T>(
  population: Chromosome<T>[],
  exclude?: Chromosome<T>
): Chromosome<T> {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }

  let populationFitness = 0;
  population.forEach(candidate => {
    if (candidate !== exclude) {
      populationFitness += candidate[fitnessSym];
    }
  });

  let accumulator = 0;
  const pick = Math.random();
  for (const candidate of population) {
    if (candidate !== exclude) {
      accumulator += candidate[fitnessSym] / populationFitness;
      if (pick < accumulator) {
        return candidate;
      }
    }
  }

  throw new Error('pickRoulette: this should never happen ;-)');
}
