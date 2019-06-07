import { distance, Point } from '../utils/points';

export function findPathByNearestNeighbour<T extends Point>(points: T[]): T[] {
  const path: T[] = [];

  if (points.length) {
    const unvisited = new Set(points);

    let current = points[0];
    unvisited.delete(current);
    path.push(current);

    while (unvisited.size) {
      const iterator = unvisited.values();
      let minCity = iterator.next().value;
      let minDist = distance(minCity, current);

      for (const city of iterator) {
        if (city.x <= minDist && city.y <= minDist) {
          const dist = distance(city, current);
          if (dist < minDist) {
            minCity = city;
            minDist = dist;
          }
        }
      }

      current = minCity;
      unvisited.delete(current);
      path.push(current);
    }
  }

  return path;
}
