export interface Point {
  x: number;
  y: number;
}

export function distance(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function pathLength(path: Point[]) {
  return path.reduce((sum, city, i) => {
    const iNext = i === path.length - 1 ? 0 : i + 1;
    return sum + distance(city, path[iNext]);
  }, 0);
}
