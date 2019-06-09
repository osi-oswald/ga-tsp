// https://www.w3resource.com/javascript-exercises/javascript-array-exercise-18.php
export function binarySearchAsc<T>(items: T[], value: number, getValue: (i: T) => number) {
  let firstIndex = 0;
  let lastIndex = items.length - 1;
  let middleIndex = Math.floor((lastIndex + firstIndex) / 2);
  let middleValue = getValue(items[middleIndex]);

  while (middleValue !== value && firstIndex < lastIndex) {
    if (value < middleValue) {
      lastIndex = middleIndex - 1;
    } else if (value > middleValue) {
      firstIndex = middleIndex + 1;
    }
    middleIndex = Math.floor((lastIndex + firstIndex) / 2);
    middleValue = getValue(items[middleIndex]);
  }

  return middleValue === value ? middleIndex : -1;
}
