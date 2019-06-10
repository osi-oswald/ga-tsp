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
  reporting: (report: { path: T[]; generations: number; isTerminated: boolean }) => void;
}) {
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
  let generations = 0;
  let staleGenerations = 0;
  let bestFitness = population.elite[fitnessSym];

  function terminate() {
    isTerminated = true;
  }

  function evolve() {
    const tempPopulation = new Population<T>();

    while (tempPopulation.length < args.populationSize) {
      // Candidate Selection
      let candidate = pickRoulette(population);
      let mate = pickRoulette(population, candidate);

      // Candidate Crossover
      const children = new Population(
        crossoverOrder1(candidate, mate)
          .concat(crossoverOrder1(candidate, reverse(mate))) // because of symmetric solutions
          .map(addFitness)
      ).sortByFitnessAsc();
      candidate = children.elite;

      // Candidate Mutation
      const mutationRate = Math.random();
      candidate = addFitness(mutateDeleteAndRepair(candidate, mutationRate));

      tempPopulation.push(candidate);
    }
    tempPopulation.sortByFitnessAsc();

    const newPopulation = new Population<T>();
    const iter = population[Symbol.iterator]();
    const tempIter = tempPopulation[Symbol.iterator]();
    let candidate = iter.next().value;
    let tempCandidate = tempIter.next().value;

    // take best of current and temp population
    while (newPopulation.length < args.populationSize) {
      if (candidate[fitnessSym] < tempCandidate[fitnessSym]) {
        newPopulation.push(candidate);
        candidate = iter.next().value;
      } else {
        newPopulation.push(tempCandidate);
        tempCandidate = tempIter.next().value;
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

    if (isTerminated || generations > maxGenerations || staleGenerations > maxStaleGenerations) {
      isTerminated = true;
      clearInterval(evolution);
    }

    args.reporting({ path: population.elite, generations, isTerminated });
  }

  const evolution = setInterval(evolve);

  return terminate;
}
