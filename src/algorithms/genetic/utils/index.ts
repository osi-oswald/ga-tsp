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

  if (items[middleIndex] === item) {
    // item was found, but might not be first occurrence
    while (items[--middleIndex] === item) {}
    return middleIndex + 1;
  } else if (middleValue === itemValue) {
    // different item with same item value was found

    // search forward
    let index = middleIndex;
    while (++index < items.length && getValue(items[index]) === itemValue) {
      if (items[index] === item) {
        return index;
      }
    }

    // search backward
    while (--middleIndex > -1 && getValue(items[middleIndex]) === itemValue) {
      if (items[middleIndex] === item) {
        return middleIndex;
      }
    }
  }

  return -1;
}
