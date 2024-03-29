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
  maxStaleTime?: number;
  reportingInterval?: number;
  reporting: (report: { path: T[]; generations: number; isTerminated: boolean }) => void;
}) {
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
  let generations = 0;
  let staleTime = Date.now();
  let bestFitness = population.elite[fitnessSym];

  function terminate() {
    isTerminated = true;
  }

  function evolve() {
    const tempPopulation = new Population<T>();

    while (tempPopulation.length < args.populationSize) {
      // Selection
      let candidate = pickRoulette(population);
      let mate = pickRoulette(population, candidate);

      // Crossover
      const children = new Population(
        crossoverOrder1(candidate, mate)
          .concat(crossoverOrder1(candidate, reverse(mate))) // because of symmetric solutions
          .map(addFitness)
      );
      candidate = children.elite;

      // Mutation
      const mutationRate = Math.random();
      candidate = addFitness(mutateDeleteAndRepair(candidate, mutationRate));

      tempPopulation.push(candidate);
    }
    tempPopulation.sort();

    const newPopulation = new Population<T>();
    const iter = population[Symbol.iterator]();
    const tempIter = tempPopulation[Symbol.iterator]();
    let candidate = iter.next().value;
    let tempCandidate = tempIter.next().value;

    // Elitism
    while (newPopulation.length < args.populationSize) {
      if (candidate[fitnessSym] > tempCandidate[fitnessSym]) {
        newPopulation.push(candidate);
        candidate = iter.next().value;
      } else {
        newPopulation.push(tempCandidate);
        tempCandidate = tempIter.next().value;
      }
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
