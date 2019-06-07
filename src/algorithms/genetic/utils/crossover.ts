import { Chromosome } from './index';
import { randomInclusive } from '../../common';

export function crossoverOrder1<T>(parent1: Chromosome<T>, parent2: Chromosome<T>): [T[], T[]] {
  const length = parent1.length;

  if (length !== parent2.length) {
    throw new Error('crossoverOrder1: chromosome length must be equal');
  }
  if (length < 2) {
    throw new Error('crossoverOrder1: chromosome length must be > 1');
  }

  const start = randomInclusive(0, length - 2);
  const end = randomInclusive(start + 1, length);

  const parten1Iter = parent1[Symbol.iterator]();
  const child1: T[] = [];
  const child1Set = new Set<T>();

  const parten2Iter = parent2[Symbol.iterator]();
  const child2: T[] = [];
  const child2Set = new Set<T>();

  // middle section
  for (let i = start; i < end; i++) {
    child1[i] = parent1[i];
    child1Set.add(child1[i]);
    child2[i] = parent2[i];
    child2Set.add(child2[i]);
  }

  // head section
  for (let i = 0; i < start; i++) {
    fillMissing(i, child1, child1Set, parten2Iter);
    fillMissing(i, child2, child2Set, parten1Iter);
  }

  // tail section
  for (let i = end; i < length; i++) {
    fillMissing(i, child1, child1Set, parten2Iter);
    fillMissing(i, child2, child2Set, parten1Iter);
  }

  return [child1, child2];
}

function fillMissing<T>(
  index: number,
  child: T[],
  childSet: Set<T>,
  parentIter: IterableIterator<T>
) {
  while (true) {
    let parentGene = parentIter.next();
    if (!childSet.has(parentGene.value)) {
      child[index] = parentGene.value;
      childSet.add(child[index]);
      break;
    }
  }
}
