export function randomExclusive(maxExclusive: number) {
  return Math.floor(Math.random() * maxExclusive);
}

export function randomInclusive(minInclusive: number, maxInclusive: number) {
  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[], mutateArray: boolean = false): T[] {
  const shuffled = mutateArray ? array : [...array];

  let currentIndex = array.length;
  let temporaryValue: T;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  return shuffled;
}

export function memoizeByRef<T extends object, R>(func: (arg: T) => R): (arg: T) => R {
  const cache = new WeakMap<T, R>();
  return function(arg: T) {
    let cached = cache.get(arg);
    if (!cached) {
      cached = func(arg);
      cache.set(arg, cached);
    }
    return cached;
  };
}
