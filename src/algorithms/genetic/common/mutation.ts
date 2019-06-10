import { randomExclusive } from '../../common';
import { Chromosome, Gene } from './index';
import { shuffle } from '../../common/shuffle';

export function mutateSwap1<T>(candidate: Chromosome<T>): Gene<T>[] {
  const length = candidate.length;
  if (length < 2) {
    throw new Error('mutateSwap1: chromosome length must be > 1');
  }

  const mutated = [...candidate];
  const index1 = randomExclusive(length);
  const index2 = randomExclusive(length); // ignore if index2 === index1
  mutated[index1] = candidate[index2];
  mutated[index2] = candidate[index1];

  return mutated;
}

export function mutationRatePerGene(chromosomeLength: number, mutationRate: number) {
  return 1 - (1 - mutationRate) ** (1 / chromosomeLength);
}

export function mutateDeleteAndRepair<T>(candidate: Chromosome<T>, mutationRate: number) {
  const rate = mutationRatePerGene(candidate.length, mutationRate);
  const mutated: T[] = [];
  const deleted: T[] = [];
  const deletedIndexes: number[] = [];

  // delete random genes
  for (let i = 0; i < candidate.length; i++) {
    if (Math.random() < rate) {
      deletedIndexes.push(i);
      deleted.push(candidate[i]);
    } else {
      mutated[i] = candidate[i];
    }
  }

  if (deleted.length < 2) {
    // no mutation, therefore no need to repair
    return candidate;
  }

  // repair deleted genes
  shuffle(deleted, true);
  for (let i = 0; i < deleted.length; i++) {
    mutated[deletedIndexes[i]] = deleted[i];
  }

  return mutated;
}
