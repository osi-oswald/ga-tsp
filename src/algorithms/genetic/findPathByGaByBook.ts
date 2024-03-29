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
  maxStaleTime?: number;
  reportingInterval?: number;
  reporting: (report: { path: T[]; generations: number; isTerminated: boolean }) => void;
}) {
  let generations = 0;

  if (!args.cities.length || args.populationSize < 2) {
    return;
  }

  let lastReportingTime = Date.now();
  const reportingInterval = args.reportingInterval || 100;
  const maxStaleTime = args.maxStaleTime || 1000;

  // Initialize population
  let population = new Population<T>();
  for (let i = 0; i < args.populationSize; i++) {
    const candidate = addFitness(shuffle(args.cities));
    population.push(candidate);
  }
  population.sort();

  let isTerminated = false;
  let staleTime = Date.now();
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
        );
        candidate = children.elite;
      }

      // Mutation
      if (Math.random() < args.mutationRate) {
        candidate = addFitness(mutateSwap1(candidate));
      }

      newPopulation.push(candidate);
    }

    population = newPopulation;
    population.sort();
    generations++;

    if (population.elite[fitnessSym] > bestFitness) {
      bestFitness = population.elite[fitnessSym];
      staleTime = Date.now();
    }

    if (isTerminated || Date.now() - staleTime >= maxStaleTime) {
      isTerminated = true;
      clearInterval(evolution);
    }

    if (Date.now() - lastReportingTime >= reportingInterval || isTerminated) {
      args.reporting({ path: population.elite, generations, isTerminated });
      lastReportingTime = Date.now();
    }
  }

  const evolution = setInterval(evolve);
  evolve();

  return terminate;
}
