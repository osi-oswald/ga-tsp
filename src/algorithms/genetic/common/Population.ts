import { fitnessSym } from './fitness';
import { Chromosome } from './index';

export class Population<T = unknown> {
  candidates: Chromosome<T>[];
  minimizeFitness: boolean;
  isFitnessSorted: boolean;
  fitnessSum: number = 0;
  [Symbol.iterator]: () => IterableIterator<Chromosome<T>>;

  constructor(conf?: {
    candidates?: Chromosome<T>[];
    minimizeFitness?: boolean;
    isFitnessSorted?: boolean;
  }) {
    conf = conf || {};
    this.candidates = conf.candidates || [];
    this.minimizeFitness = conf.minimizeFitness || false;
    this.isFitnessSorted = conf.isFitnessSorted || false;
    this.fitnessSum = this.candidates.reduce((sum, c) => sum + c[fitnessSym], 0);
    this[Symbol.iterator] = this.candidates[Symbol.iterator].bind(this.candidates);
  }

  push(candidate: Chromosome<T>) {
    this.candidates.push(candidate);
    this.fitnessSum += candidate[fitnessSym];
    this.isFitnessSorted = false;
  }

  sort(): void {
    if (!this.isFitnessSorted) {
      if (this.minimizeFitness) {
        this.candidates.sort((a, b) => a[fitnessSym] - b[fitnessSym]);
      } else {
        this.candidates.sort((a, b) => b[fitnessSym] - a[fitnessSym]);
      }
      this.isFitnessSorted = true;
    }
  }

  filter(predicate: (c: Chromosome) => boolean): Population<T> {
    return new Population<T>({
      candidates: this.candidates.filter(predicate),
      minimizeFitness: this.minimizeFitness,
      isFitnessSorted: this.isFitnessSorted
    });
  }

  elites(count: number): Population<T> {
    this.sort();
    return new Population<T>({
      candidates: this.candidates.slice(0, count),
      minimizeFitness: this.minimizeFitness,
      isFitnessSorted: true
    });
  }

  get length() {
    return this.candidates.length;
  }

  get elite() {
    this.sort();
    return this.candidates[0];
  }
}
