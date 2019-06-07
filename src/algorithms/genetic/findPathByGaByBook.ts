import { Point } from '../common/points';
import { shuffle } from '../common';
import { Chromosome } from './utils';
import { pickRoulette } from './utils/selection';
import { crossoverOrder1 } from './utils/crossover';
import { mutateSwap1 } from './utils/mutation';
import { addFitness, fitnessAsc, fitnessSym } from './utils/fitness';

export function findPathByGaByBook<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  elitismRate?: number;
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
    const newPopulation: Chromosome<T>[] = [];

    // Save elites
    if (args.elitismRate) {
      const elites = population.slice(0, args.populationSize * args.elitismRate);
      newPopulation.push(...elites);
    }

    while (newPopulation.length < args.populationSize) {
      // Selection
      let candidate = pickRoulette(population);

      // Crossover
      if (Math.random() < args.crossoverRate) {
        const mate = pickRoulette(population, candidate);
        const children = crossoverOrder1(candidate, mate).map(c => addFitness(c));
        candidate = children.sort(fitnessAsc)[0];
      }

      // Mutation
      if (Math.random() < args.mutationRate) {
        candidate = addFitness(mutateSwap1(candidate));
      }

      newPopulation.push(candidate);
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