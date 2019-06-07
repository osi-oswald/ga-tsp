import { fitnessSym } from './fitness';

export type Chromosome<T = object> = T[] & { [fitnessSym]: number };
