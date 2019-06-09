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

export function memoizeByRef<R, T extends object>(func: (arg: T) => R): (arg: T) => R {
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

export function memoizeByRef2<R, T1 extends object, T2 extends object>(
  func: (arg1: T1, arg2: T2) => R
): (arg1: T1, arg2: T2) => R {
  const cache1 = new WeakMap<T1, WeakMap<T2, R>>();
  return function(arg1: T1, arg2: T2) {
    let cache2 = cache1.get(arg1);
    if (!cache2) {
      cache2 = new WeakMap<T2, R>();
      cache1.set(arg1, cache2);
    }
    let cached = cache2.get(arg2);
    if (!cached) {
      cached = func(arg1, arg2);
      cache2.set(arg2, cached);
    }
    return cached;
  };
}
