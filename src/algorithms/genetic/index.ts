/*
TODO:
- elitism
- crossover: by order 1
- mutation: by swapping
 */

import { pathLength, Point } from '../utils/points';
import { randomInt, shuffle } from '../utils';

export function fitness(path: Point[]): number {
  return pathLength(path);
}

export function pickRoulette<T>(population: T[], exclude?: T): T {
  return null as any;
}

export function pickBest<T>(population: T[]): T {
  return null as any;
}

export function pickBestN<T>(population: T[], amount: number): T[] {
  return null as any;
}

export function crossoverOrder1<T>(parent1: T, parent2: T): [T, T] {
  return null as any;
}

export function mutateSwap1<T>(candidate: T, mutationRate: number): T {
  return null as any;
}

export function findPathByGeneticClassic<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  elitismRate?: number;
}): Point[] {
  // Initialize population
  let population: T[][] = [];
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = shuffle(args.cities);
    population.push(candidate);
  }

  let generationCount = 0;
  while (generationCount < 10) {
    const newPopulation: T[][] = [];

    // Save elites
    if (args.elitismRate) {
      const elites = pickBestN(population, args.populationSize * args.elitismRate);
      newPopulation.push(...elites);
    }

    while (newPopulation.length < args.populationSize) {
      // Selection
      let candidate = pickRoulette(population);

      // Crossover
      if (Math.random() < args.crossoverRate) {
        const candidateOther = pickRoulette(population, candidate);
        candidate = pickBest(crossoverOrder1(candidate, candidateOther));
      }

      // Mutation
      if (Math.random() < args.mutationRate) {
        candidate = mutateSwap1(candidate, args.mutationRate);
      }

      newPopulation.push(candidate);
      generationCount++;
    }

    population = newPopulation;
  }

  return pickBest(population);
}
