import { fitnessSym } from './fitness';
import { randomExclusive } from '../../common';
import { Chromosome } from './index';
import { Population } from './Population';

export function pickRandom<T>(population: Population<T>, exclude?: Chromosome<T>) {
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

export function pickRoulette<T>(population: Population<T>, exclude?: Chromosome<T>): Chromosome<T> {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }

  let accumulator = 0;
  let pick: Chromosome<T>;
  const pickIndex = Math.random();
  for (const candidate of population) {
    accumulator += candidate[fitnessSym] / population.fitnessSum;
    if (pickIndex < accumulator) {
      pick = candidate;
      break;
    }
  }

  if (pick! == null) {
    throw new Error('pickRoulette: this should never happen ;-)');
  }

  // should be rare
  if (pick === exclude) {
    population = population.filter(c => c !== exclude);
    if (population.length === 0) {
      console.warn('pickRandom: all candidates matched the exclude candidate');
    } else {
      pick = pickRoulette(population);
    }
  }

  return pick;
}
