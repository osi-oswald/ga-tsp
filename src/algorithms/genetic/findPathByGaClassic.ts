import { Point } from '../common/points';
import { shuffle } from '../common';
import { Chromosome } from './utils';
import { pickRoulette } from './utils/selection';
import { crossoverOrder1 } from './utils/crossover';
import { mutateSwap1 } from './utils/mutation';
import { addFitness, fitnessAsc, fitnessSym } from './utils/fitness';

export function findPathByGaClassic<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  elitismRate?: number;
  maxGenerations?: number;
  maxStaleGenerations?: number;
}): T[] {
  if (!args.cities.length || args.populationSize < 2) {
    return args.cities;
  }

  if (!args.maxGenerations && !args.maxStaleGenerations) {
    throw new Error(
      'findPathByGaClassic: either maxGenerations or maxStaleGenerations must be set'
    );
  }
  const maxGenerations = args.maxGenerations || Infinity;
  const maxStaleGenerations = args.maxStaleGenerations || Infinity;

  // Initialize population
  let population: Chromosome<T>[] = [];
  let populationFitness = 0;
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = addFitness(shuffle(args.cities));
    population.push(candidate);
    populationFitness += candidate[fitnessSym];
  }
  population.sort(fitnessAsc);

  let bestFitness = population[0][fitnessSym];
  let staleCount = 0;
  let generationCount = 0;
  while (generationCount <= maxGenerations && staleCount <= maxStaleGenerations) {
    const newPopulation: Chromosome<T>[] = [];
    let newPopulationFitness = 0;

    // Save elites
    if (args.elitismRate) {
      const elites = population.slice(0, args.populationSize * args.elitismRate);
      elites.forEach(elite => {
        newPopulation.push(elite);
        newPopulationFitness += elite[fitnessSym];
      });
    }

    while (newPopulation.length < args.populationSize) {
      // Selection
      let candidate = pickRoulette(population, populationFitness);

      // Crossover
      if (Math.random() < args.crossoverRate) {
        const mate = pickRoulette(population, populationFitness, candidate);
        const children = crossoverOrder1(candidate, mate).map(c => addFitness(c));
        candidate = children.sort(fitnessAsc)[0];
      }

      // Mutation
      if (Math.random() < args.mutationRate) {
        candidate = addFitness(mutateSwap1(candidate));
      }

      newPopulation.push(candidate);
      newPopulationFitness += candidate[fitnessSym];
      generationCount++;
    }

    population = newPopulation;
    population.sort(fitnessAsc);
    populationFitness = newPopulationFitness;

    if (population[0][fitnessSym] > bestFitness) {
      bestFitness = population[0][fitnessSym];
      staleCount = 0;
    } else {
      staleCount++;
    }
  }

  return population[0];
}