import { Chromosome } from './index';
import { randomExclusive } from '../../common';

export function swapWithNext<T>(target: T[], index: number) {
  const temp = target[index];
  const indexNext = (index + 1) % target.length;
  target[index] = target[indexNext];
  target[indexNext] = temp;
}

export function mutateSwap1<T>(candidate: Chromosome<T>): T[] {
  const length = candidate.length;
  if (length < 2) {
    throw new Error('mutateSwap1: chromosome length must be > 1');
  }

  const clone = [...candidate];
  swapWithNext(clone, randomExclusive(length));

  return clone;
}

export function mutationRateByGene(chromosomeLength: number, mutationRateByChromosome: number) {
  return 1 - (1 - mutationRateByChromosome) ** (1 / chromosomeLength);
}

export function mutateSwapX<T>(candidate: Chromosome<T>, mutationRate: number): T[] {
  const length = candidate.length;
  if (length < 2) {
    throw new Error('mutateSwap1: chromosome length must be > 1');
  }

  const clone = [...candidate];
  const rate = mutationRateByGene(candidate.length, mutationRate) / 2; // divided by 2 because swapping changes 2 genes
  for (let i = 0; i < clone.length; i++) {
    if (Math.random() < rate) {
      swapWithNext(clone, i);
    }
  }

  return clone;
}
