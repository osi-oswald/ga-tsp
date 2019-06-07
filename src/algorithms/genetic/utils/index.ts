import { fitnessSym } from './fitness';

export type Chromosome<T = object> = T[] & { [fitnessSym]: number };

// https://www.w3resource.com/javascript-exercises/javascript-array-exercise-18.php
export function binarySearchAsc<T>(items: T[], item: T, getValue: (i: T) => number) {
  let firstIndex = 0;
  let lastIndex = items.length - 1;
  let middleIndex = Math.floor((lastIndex + firstIndex) / 2);
  let middleValue = getValue(items[middleIndex]);
  let itemValue = getValue(item);

  while (middleValue !== itemValue && firstIndex < lastIndex) {
    if (itemValue < middleValue) {
      lastIndex = middleIndex - 1;
    } else if (itemValue > middleValue) {
      firstIndex = middleIndex + 1;
    }
    middleIndex = Math.floor((lastIndex + firstIndex) / 2);
    middleValue = getValue(items[middleIndex]);
  }

  if (middleValue === itemValue) {
    // find first occurrence of item

    function search(index: number, endIndex: number, direction: -1 | 1): number {
      let result = index;
      while (index !== endIndex && getValue(items[index]) === itemValue) {
        if (items[index] === item) {
          result = index;
        }
        index += direction;
      }
      return result;
    }

    middleIndex = search(middleIndex, -1, -1);
    if (items[middleIndex] !== item) {
      middleIndex = search(middleIndex + 1, items.length, +1);
    }
  }

  return items[middleIndex] === item ? middleIndex : -1;
}
