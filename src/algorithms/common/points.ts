import { memoizeByRef, memoizeByRef2 } from './index';

export interface Point {
  x: number;
  y: number;
}

export const distance = memoizeByRef2((p1: Point, p2: Point) =>
  Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
);

export const pathLength = memoizeByRef((path: Point[]) =>
  path.reduce((sum, point, i) => sum + distance(point, path[(i + 1) % path.length]), 0)
);
