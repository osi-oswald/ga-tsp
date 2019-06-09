import { fitnessSym } from './fitness';
import { randomExclusive } from '../../common';
import { Chromosome } from './index';
import { Population } from './Population';

function repick<T>(
  population: Population<T>,
  exclude: Chromosome<T>,
  pickFn: (p: Population<T>) => Chromosome<T>
): Chromosome<T> {
  population = population.filter(c => c !== exclude);
  if (population.length === 0) {
    console.warn('repick: all candidates matched the exclude candidate');
    return exclude;
  } else {
    return pickFn(population);
  }
}

function checkPopulation(population: Population) {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }
}

export function pickRandom<T>(population: Population<T>, exclude?: Chromosome<T>): Chromosome<T> {
  checkPopulation(population);

  let pick = population[randomExclusive(population.length)];
  return pick === exclude ? repick(population, exclude!, pickRandom) : pick;
}

export function pickRoulette<T>(population: Population<T>, exclude?: Chromosome<T>): Chromosome<T> {
  checkPopulation(population);

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

  return pick === exclude ? repick(population, exclude!, pickRoulette) : pick;
}
