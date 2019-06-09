import { fitnessSym } from './fitness';
import { Chromosome } from './index';

export class Population<T = unknown> {
  fitnessSum: number = 0;
  candidates: Chromosome<T>[] = [];

  [Symbol.iterator] = this.candidates[Symbol.iterator].bind(this.candidates);

  push(candidate: Chromosome<T>) {
    this.candidates.push(candidate);
    this.fitnessSum += candidate[fitnessSym];
  }

  sort(compareFn?: (a: Chromosome, b: Chromosome) => number) {
    this.candidates.sort(compareFn);
  }

  filter(predicate: (c: Chromosome) => boolean): Population<T> {
    let population = new Population<T>();
    this.candidates.forEach(c => predicate(c) && population.push(c));
    return population;
  }

  elites(count: number): Population<T> {
    let population = new Population<T>();
    for (let i = 0; i < count; i++) {
      population.push(this.candidates[i]);
    }
    return population;
  }

  get length() {
    return this.candidates.length;
  }

  get elite() {
    return this.candidates[0];
  }
}
