export function randomExclusive(maxExclusive: number) {
  return Math.floor(Math.random() * maxExclusive);
}

export function randomInclusive(minInclusive: number, maxInclusive: number) {
  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
}
