import { Point } from '../common/points';
import { shuffle } from '../common';
import { pickRoulette } from './common/selection';
import { crossoverOrder1, reverse } from './common/crossover';
import { mutateDeleteAndRepair } from './common/mutation';
import { addFitness, fitnessAsc, fitnessSym } from './common/fitness';
import { Population } from './common/types';

export function findPathByGaByMe<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  maxGenerations?: number;
  maxStaleGenerations?: number;
}): { path: T[]; generations: number } {
  let generations = 0;

  if (!args.cities.length || args.populationSize < 2) {
    return { path: args.cities, generations };
  }

  if (!args.maxGenerations && !args.maxStaleGenerations) {
    throw new Error('findPathByGaByBook: either maxGenerations or maxStaleGenerations must be set');
  }
  const maxGenerations = args.maxGenerations || Infinity;
  const maxStaleGenerations = args.maxStaleGenerations || Infinity;

  // Initialize population
  let populationFitness = 0;
  let population: Population<T> = [];
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = addFitness(shuffle(args.cities));
    population.push(candidate);
    populationFitness += candidate[fitnessSym];
  }
  population.sort(fitnessAsc);

  let staleGenerations = 0;
  let bestFitness = population[0][fitnessSym];
  while (generations <= maxGenerations && staleGenerations <= maxStaleGenerations) {
    const populationPool: Population<T> = [];

    while (populationPool.length < args.populationSize) {
      // Candidate Selection
      let candidate = pickRoulette(population, populationFitness);
      let mate = pickRoulette(population, populationFitness, candidate);

      // Candidate Crossover
      const children = crossoverOrder1(candidate, mate)
        .concat(crossoverOrder1(candidate, reverse(mate)))
        .map(c => addFitness(c));
      candidate = children.sort(fitnessAsc)[0];

      // Candidate Mutation
      const mutationRate = Math.random();
      candidate = addFitness(mutateDeleteAndRepair(candidate, mutationRate));

      populationPool.push(candidate);
    }
    populationPool.sort(fitnessAsc);

    // Population Selection
    let newPopulationFitness = 0;
    const newPopulation: Population<T> = [];
    const iter = population[Symbol.iterator]();
    const poolIter = populationPool[Symbol.iterator]();
    let iterValue = iter.next().value;
    let poolIterValue = poolIter.next().value;

    while (newPopulation.length < args.populationSize) {
      if (iterValue[fitnessSym] < poolIterValue[fitnessSym]) {
        newPopulation.push(iterValue);
        newPopulationFitness += iterValue[fitnessSym];
        iterValue = iter.next().value;
      } else {
        newPopulation.push(poolIterValue);
        newPopulationFitness += poolIterValue[fitnessSym];
        poolIterValue = poolIter.next().value;
      }
    }

    population = newPopulation;
    populationFitness = newPopulationFitness;
    population.sort(fitnessAsc);

    generations++;
    if (population[0][fitnessSym] < bestFitness) {
      bestFitness = population[0][fitnessSym];
      staleGenerations = 0;
    } else {
      staleGenerations++;
    }
  }

  return { path: population[0], generations };
}
