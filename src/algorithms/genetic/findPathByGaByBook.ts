import { Point } from '../common/points';
import { pickRoulette } from './common/selection';
import { crossoverOrder1, reverse } from './common/crossover';
import { mutateSwap1 } from './common/mutation';
import { addFitness, fitnessSym } from './common/fitness';
import { Population } from './common/Population';
import { shuffle } from '../common/shuffle';

export function findPathByGaByBook<T extends Point>(args: {
  cities: T[];
  populationSize: number;
  crossoverRate: number;
  mutationRate: number;
  elitismRate?: number;
  maxGenerations?: number;
  maxStaleGenerations?: number;
  reporting: (report: { path: T[]; generations: number; isTerminated: boolean }) => void;
}) {
  let generations = 0;

  if (!args.cities.length || args.populationSize < 2) {
    return;
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

  let isTerminated = false;
  let staleGenerations = 0;
  let bestFitness = population.elite[fitnessSym];

  function terminate() {
    isTerminated = true;
  }

  function evolve() {
    // Elitism
    const newPopulation = args.elitismRate
      ? population.elites(population.length * args.elitismRate)
      : new Population<T>();

    while (newPopulation.length < args.populationSize) {
      // Selection
      let candidate = pickRoulette(population);

      // Crossover
      if (Math.random() < args.crossoverRate) {
        const mate = pickRoulette(population, candidate);
        const children = new Population(
          crossoverOrder1(candidate, mate)
            .concat(crossoverOrder1(candidate, reverse(mate))) // because of symmetric solutions
            .map(addFitness)
        ).sortByFitnessAsc();
        candidate = children.elite;
      }

      // Mutation
      if (Math.random() < args.mutationRate) {
        candidate = addFitness(mutateSwap1(candidate));
      }

      newPopulation.push(candidate);
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

    if (isTerminated || generations > maxGenerations || staleGenerations > maxStaleGenerations) {
      isTerminated = true;
      clearInterval(evolution);
    }

    args.reporting({ path: population.elite, generations, isTerminated });
  }

  const evolution = setInterval(evolve);

  return terminate;
}
