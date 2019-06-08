import { Chromosome } from './index';
import { fitnessSym } from './fitness';
import { randomExclusive } from '../../common';

export function pickRandom<T>(population: Chromosome<T>[], exclude?: Chromosome<T>) {
  let pick = population[randomExclusive(population.length)];
  if (pick === exclude) {
    population = population.filter(c => c !== exclude);
    if (population.length === 0) {
      console.warn('pickRandom: all candidates matched the exclude candidate');
    } else {
      pick = pickRandom(population);
    }
  }

  return pick;
}

export function pickRoulette<T>(
  population: Chromosome<T>[],
  populationFitness: number,
  exclude?: Chromosome<T>
): Chromosome<T> {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }

  let accumulator = 0;
  let pick: Chromosome<T>;
  const pickIndex = Math.random();
  for (const candidate of population) {
    accumulator += candidate[fitnessSym] / populationFitness;
    if (pickIndex < accumulator) {
      pick = candidate;
      break;
    }
  }

  if (pick! == null) {
    throw new Error('pickRoulette: this should never happen ;-)');
  }

  if (pick === exclude) {
    population = population.filter(c => {
      if (c === exclude) {
        populationFitness -= exclude[fitnessSym];
        return false;
      }
      return true;
    });

    if (population.length === 0) {
      console.warn('pickRandom: all candidates matched the exclude candidate');
    } else {
      pick = pickRoulette(population, populationFitness);
    }
  }

  return pick;
}
