import { fitnessSym } from './fitness';

export type Gene<T = unknown> = T;
export type Chromosome<T = unknown> = Gene<T>[] & { [fitnessSym]: number };
