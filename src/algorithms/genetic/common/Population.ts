import { fitnessSym } from './fitness';
import { Chromosome } from './index';

/**
 * Fitness is expected to be positive and getting maximized.
 */
export class Population<T = unknown> {
  fitnessSum: number = 0;
  [Symbol.iterator] = this.candidates[Symbol.iterator].bind(this.candidates);

  constructor(public candidates: Chromosome<T>[] = [], public isFitnessSorted: boolean = false) {
    this.fitnessSum = this.candidates.reduce((sum, c) => sum + c[fitnessSym], 0);
  }

  push(candidate: Chromosome<T>) {
    this.candidates.push(candidate);
    this.fitnessSum += candidate[fitnessSym];
    this.isFitnessSorted = false;
  }

  sort(): void {
    if (!this.isFitnessSorted) {
      this.candidates.sort((a, b) => b[fitnessSym] - a[fitnessSym]);
      this.isFitnessSorted = true;
    }
  }

  filter(predicate: (c: Chromosome) => boolean): Population<T> {
    return new Population<T>(this.candidates.filter(predicate), this.isFitnessSorted);
  }

  elites(count: number): Population<T> {
    this.sort();
    return new Population<T>(this.candidates.slice(0, count), true);
  }

  get length() {
    return this.candidates.length;
  }

  get elite() {
    this.sort();
    return this.candidates[0];
  }
}
