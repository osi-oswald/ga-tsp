/**
 * Note: Won't cache return value of undefined
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
