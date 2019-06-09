import { Point } from '../common/points';
import { pickRoulette } from './common/selection';
import { crossoverOrder1, reverse } from './common/crossover';
import { mutateDeleteAndRepair } from './common/mutation';
import { addFitness, fitnessSym } from './common/fitness';
import { Population } from './common/Population';
import { shuffle } from '../common/shuffle';

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
  let population = new Population<T>();
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = addFitness(shuffle(args.cities));
    population.push(candidate);
  }
  population.sortByFitnessAsc();

  let staleGenerations = 0;
  let bestFitness = population.elite[fitnessSym];
  while (generations <= maxGenerations && staleGenerations <= maxStaleGenerations) {
    const populationPool = new Population<T>();

    while (populationPool.length < args.populationSize) {
      // Candidate Selection
      let candidate = pickRoulette(population);
      let mate = pickRoulette(population, candidate);

      // Candidate Crossover
      const children = new Population(
        crossoverOrder1(candidate, mate)
          .concat(crossoverOrder1(candidate, reverse(mate)))
          .map(c => addFitness(c))
      ).sortByFitnessAsc();
      candidate = children.elite;

      // Candidate Mutation
      const mutationRate = Math.random();
      candidate = addFitness(mutateDeleteAndRepair(candidate, mutationRate));

      populationPool.push(candidate);
    }
    populationPool.sortByFitnessAsc();

    // Population Selection
    const newPopulation = new Population<T>();
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
    population.sortByFitnessAsc();

    generations++;
    if (population.elite[fitnessSym] < bestFitness) {
      bestFitness = population.elite[fitnessSym];
      staleGenerations = 0;
    } else {
      staleGenerations++;
    }
  }

  return { path: population.elite, generations };
}
