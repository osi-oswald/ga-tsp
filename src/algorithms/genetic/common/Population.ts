import { fitnessSym } from './fitness';
import { Chromosome } from './index';

export class Population<T = unknown> {
  fitnessSum: number = 0;

  [Symbol.iterator] = this.candidates[Symbol.iterator].bind(this.candidates);

  constructor(public candidates: Chromosome<T>[] = [], public isSortedByFitness = false) {}

  push(candidate: Chromosome<T>) {
    this.candidates.push(candidate);
    this.fitnessSum += candidate[fitnessSym];
    this.isSortedByFitness = false;
  }

  sortByFitnessAsc(): this {
    this.candidates.sort((a, b) => a[fitnessSym] - b[fitnessSym]);
    this.isSortedByFitness = true;
    return this;
  }

  sortByFitnessDesc(): this {
    this.candidates.sort((a, b) => b[fitnessSym] - a[fitnessSym]);
    this.isSortedByFitness = true;
    return this;
  }

  filter(predicate: (c: Chromosome) => boolean): Population<T> {
    return new Population<T>(this.candidates.filter(predicate), this.isSortedByFitness);
  }

  elites(count: number): Population<T> {
    if (!this.isSortedByFitness) {
      throw new Error('Population: must be sorted first');
    }
    return new Population<T>(this.candidates.slice(0, count), true);
  }

  get length() {
    return this.candidates.length;
  }

  get elite() {
    if (!this.isSortedByFitness) {
      throw new Error('Population: must be sorted first');
    }
    return this.candidates[0];
  }
}
