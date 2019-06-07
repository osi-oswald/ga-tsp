/*
TODO:
- elitism
- crossover: by order 1
- mutation: by swapping
 */

import { pathLength, Point } from '../utils/points';
import { shuffle } from '../utils';

export function pickRoulette<T>(
  population: Chromosome<T>[],
  exclude?: Chromosome<T>
): Chromosome<T> {
  return null as any;
}

export function crossoverOrder1<T>(parent1: Chromosome<T>, parent2: Chromosome<T>): [T[], T[]] {
  return null as any;
}

export function mutateSwap1<T>(candidate: Chromosome<T>, mutationRate: number): T[] {
  return null as any;
}

export function fitness(path: Point[]): number {
  return pathLength(path);
}

export const fitnessSym = Symbol('fitness');
export type Chromosome<T = object> = T[] & { [fitnessSym]: number };

export function addFitness<T extends Point>(candidate: T[]): Chromosome<T> {
  candidate[fitnessSym] = fitness(candidate);
  return candidate as Chromosome<T>;
}

export const fitnessDesc = (a: Chromosome, b: Chromosome) => b[fitnessSym] - a[fitnessSym];

export function findPathByGeneticClassic<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  elitismRate?: number;
}): Point[] {
  // Initialize population
  let population: Chromosome<T>[] = [];
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = shuffle(args.cities);
    population.push(addFitness(candidate));
  }
  population.sort(fitnessDesc);

  let generationCount = 0;
  while (generationCount < 10) {
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
        candidate = children.sort(fitnessDesc)[0];
      }

      // Mutation
      if (Math.random() < args.mutationRate) {
        candidate = addFitness(mutateSwap1(candidate, args.mutationRate));
      }

      newPopulation.push(candidate);
      generationCount++;
    }

    population = newPopulation;
    population.sort(fitnessDesc);
  }

  return population[0];
}
