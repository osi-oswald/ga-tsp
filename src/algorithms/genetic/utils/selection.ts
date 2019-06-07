import { randomExclusive } from '../../common';
import { Chromosome } from './index';

export function pickRoulette<T>(
  population: Chromosome<T>[],
  exclude?: Chromosome<T>
): Chromosome<T> {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }

  const index = randomExclusive(population.length);
  let candidate = population[randomExclusive(population.length)];

  if (candidate === exclude) {
    if (population.length <= 1) {
      throw new Error('pickRoulette with exclude: population size must be > 1');
    }
    candidate = population[(index + 1) % population.length];
  }

  return candidate;
}
