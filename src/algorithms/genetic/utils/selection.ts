import { randomExclusive } from '../../common';
import { Chromosome } from './index';
import { fitnessSym } from './fitness';

export function pickRoulette<T>(
  population: Chromosome<T>[],
  populationFitness: number,
  exclude?: Chromosome<T>
): Chromosome<T> {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }

  if (exclude) {
    if (population.length <= 1) {
      throw new Error('pickRoulette with exclude: population size must be > 1');
    }
    populationFitness -= exclude[fitnessSym];
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
