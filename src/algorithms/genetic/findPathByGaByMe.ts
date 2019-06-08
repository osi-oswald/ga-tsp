import { Point } from '../common/points';
import { shuffle } from '../common';
import { Chromosome } from './utils';
import { pickRandom, pickRoulette } from './utils/selection';
import { crossoverOrder1 } from './utils/crossover';
import { mutateSwapX } from './utils/mutation';
import { addFitness, fitnessAsc, fitnessSym } from './utils/fitness';

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
  let population: Chromosome<T>[] = [];
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = addFitness(shuffle(args.cities));
    population.push(candidate);
  }
  population.sort(fitnessAsc);

  let staleGenerations = 0;
  let bestFitness = population[0][fitnessSym];
  while (generations <= maxGenerations && staleGenerations <= maxStaleGenerations) {
    const populationPool: Chromosome<T>[] = [];

    while (populationPool.length < args.populationSize) {
      // Candidate Selection
      let candidate = pickRoulette(population);
      let mate = pickRandom(population, candidate);

      // Candidate Crossover
      const children = crossoverOrder1(candidate, mate).map(c => addFitness(c));
      candidate = children.sort(fitnessAsc)[0];

      // Candidate Mutation
      const mutationRate = Math.random();
      candidate = addFitness(mutateSwapX(candidate, mutationRate));

      populationPool.push(candidate);
    }
    populationPool.sort(fitnessAsc);

    // Population Selection
    const newPopulation: Chromosome<T>[] = [];
    const iter = population[Symbol.iterator]();
    const poolIter = populationPool[Symbol.iterator]();
    let iterValue = iter.next().value;
    let poolIterValue = poolIter.next().value;

    while (newPopulation.length < args.populationSize) {
      if (iterValue[fitnessSym] < poolIterValue[fitnessSym]) {
        newPopulation.push(iterValue);
        iterValue = iter.next().value;
      } else {
        newPopulation.push(poolIterValue);
        poolIterValue = poolIter.next().value;
      }
    }

    population = newPopulation;
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
