export function randomExclusive(maxExclusive: number) {
  return Math.floor(Math.random() * maxExclusive);
}

export function randomInclusive(minInclusive: number, maxInclusive: number) {
  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
}

/**
 * Note: Won't cache return value undefined
 */
export function memoizeByRef<R, T extends object>(func: (arg: T) => R): (arg: T) => R {
  const cache = new WeakMap<T, R>();
  return function(arg: T) {
    let cached = cache.get(arg);
    if (cached === undefined) {
      cached = func(arg);
      cache.set(arg, cached);
    }
    return cached;
  };
}

/**
 * Note: Won't cache return value undefined
 */
export function memoizeByRef2<R, T1 extends object, T2 extends object>(
  func: (arg1: T1, arg2: T2) => R
): (arg1: T1, arg2: T2) => R {
  const cache1 = new WeakMap<T1, WeakMap<T2, R>>();
  return function(arg1: T1, arg2: T2) {
    let cache2 = cache1.get(arg1);
    if (cache2 === undefined) {
      cache2 = new WeakMap<T2, R>();
      cache1.set(arg1, cache2);
    }
    let cached = cache2.get(arg2);
    if (cached === undefined) {
      cached = func(arg1, arg2);
      cache2.set(arg2, cached);
    }
    return cached;
  };
}
