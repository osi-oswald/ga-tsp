import { Point } from '../common/points';
import { shuffle } from '../common';
import { Chromosome } from './utils';
import { pickRoulette } from './utils/selection';
import { crossoverOrder1 } from './utils/crossover';
import { mutateSwap1 } from './utils/mutation';
import { addFitness, fitnessDesc } from './utils/fitness';

export function findPathByGaClassic<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  elitismRate?: number;
}): T[] {
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
