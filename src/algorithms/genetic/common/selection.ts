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
  let lowIndex = 0;
  let highIndex = population.length - 1;
  let middleIndex = (highIndex + lowIndex) >>> 1;
  let pick = population.candidates[middleIndex];
  const pickTarget = Math.random() * population.fitnessSum;

  while (middleIndex > lowIndex) {
    if (pickTarget < pick[accumulatedFitnessSym]) {
      highIndex = middleIndex - 1;
    } else if (pickTarget > pick[accumulatedFitnessSym]) {
      lowIndex = middleIndex + 1;
    }
    middleIndex = (highIndex + lowIndex) >>> 1;
    pick = population.candidates[middleIndex];
  }

  return pick === exclude ? repick(population, exclude!, pickRoulette) : pick;
}
