import { fitnessSym } from './fitness';
import { randomExclusive } from '../../common';
import { Chromosome } from './index';
import { Population } from './Population';
import { memoizeByRef } from '../../common/memoize';

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

function checkPopulationLength(population: Population) {
  if (!population.length) {
    throw new Error('pickRoulette: population size must be > 0');
  }
}

export function pickRandom<T>(population: Population<T>, exclude?: Chromosome<T>): Chromosome<T> {
  checkPopulationLength(population);

  let pick = population[randomExclusive(population.length)];
  return pick === exclude ? repick(population, exclude!, pickRandom) : pick;
}

const accumulatedFitnessSym = Symbol('accumulatedFitness');

const addAccumulatedFitness = memoizeByRef(function addAccumulatedFitness<T>(
  population: Population<T>
) {
  let accumulator = 0;
  for (const candidate of population) {
    accumulator += candidate[fitnessSym];
    candidate[accumulatedFitnessSym] = accumulator;
  }
  return true;
});

export function pickRoulette<T>(population: Population<T>, exclude?: Chromosome<T>): Chromosome<T> {
  checkPopulationLength(population);
  addAccumulatedFitness(population);

  // using binary search
  let startIndex = 0;
  let endIndex = population.length - 1;
  let midIndex = (endIndex + startIndex) >>> 1;
  let pick = population.candidates[midIndex];
  const pickTarget = Math.random() * population.fitnessSum;

  while (midIndex > startIndex) {
    if (pickTarget < pick[accumulatedFitnessSym]) {
      endIndex = midIndex - 1;
    } else if (pickTarget > pick[accumulatedFitnessSym]) {
      startIndex = midIndex + 1;
    }
    midIndex = (endIndex + startIndex) >>> 1;
    pick = population.candidates[midIndex];
  }

  return pick === exclude ? repick(population, exclude!, pickRoulette) : pick;
}
