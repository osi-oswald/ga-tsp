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

  let pick = population.elite;
  const pickTarget = Math.random() * population.fitnessSum;
  addAccumulatedFitness(population);

  if (pickTarget >= population.elite[fitnessSym]) {
    // using binary search
    let firstIndex = 0;
    let lastIndex = population.length - 1;
    let middleIndex = Math.floor((lastIndex + firstIndex) / 2);
    let middle = population.candidates[middleIndex];

    while (middleIndex > firstIndex) {
      if (pickTarget < middle[accumulatedFitnessSym]) {
        lastIndex = middleIndex - 1;
      } else if (pickTarget > middle[accumulatedFitnessSym]) {
        firstIndex = middleIndex + 1;
      }
      middleIndex = Math.floor((firstIndex + lastIndex) / 2);
      middle = population.candidates[middleIndex];
    }
    pick = population.candidates[middleIndex];
  }

  return pick === exclude ? repick(population, exclude!, pickRoulette) : pick;
}
