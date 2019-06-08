import { Chromosome } from './index';
import { fitnessSym } from './fitness';
import { randomExclusive } from '../../common';

export function pickRandom<T>(population: Chromosome<T>[], exclude?: Chromosome<T>) {
  let candidate = population[randomExclusive(population.length)];
  if (candidate === exclude) {
    population = population.filter(c => c !== exclude);
    if (population.length === 0) {
      console.warn('pickRandom: all candidates matched the exclude candidate');
    } else {
      candidate = population[randomExclusive(population.length)];
    }
  }

  return candidate;
}

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

  if (populationFitness === 0) {
    console.warn('pickRoulette: all candidates matched the exclude candidate');
    return population[0];
  }

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
