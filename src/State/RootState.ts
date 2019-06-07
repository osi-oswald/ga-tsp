import { action, computed, observable } from 'mobx';

export const scale = 1000;

export let cityId = 1;

export interface City {
  id: number;
  x: number;
  y: number;
}

export function cityByRandom(): City {
  return {
    id: cityId++,
    x: Math.random() * scale,
    y: Math.random() * scale
  };
}

export function cityByAngle(degree: number): City {
  const in2Pi = (2 * Math.PI * degree) / 360;
  const halfScale = scale / 2;
  return {
    id: cityId++,
    x: Math.cos(in2Pi) * halfScale + halfScale,
    y: Math.sin(in2Pi) * halfScale + halfScale
  };
}

export function citiesByRandom(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(cityByRandom());
  }
  return cities;
}

export function distance(c1: City, c2: City) {
  return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
}

export function pathLength(cities: City[]) {
  return Math.round(
    cities.reduce((sum, city, i) => {
      const iNext = i === cities.length - 1 ? 0 : i + 1;
      return sum + distance(city, cities[iNext]);
    }, 0)
  );
}

export function findPathsByNearestNeighbour(cities: City[]): City[] {
  const path: City[] = [];

  if (cities.length) {
    const unvisited = new Set(cities);

    let current = cities[0];
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

export function citiesInCircle(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(cityByAngle((360 * i) / nrOfCities));
  }
  return cities;
}

export class RootState {
  readonly scale: number = scale;
  @observable cities: City[] = [];
  @observable paths: City[] = [];
  @observable pathsByNearestNeighbour: City[] = [];
  @observable nrOfCities: number = 10;

  constructor() {
    this.generateInCircle();
  }

  @action
  generateByRandom() {
    this.cities = citiesByRandom(this.nrOfCities);
    this.paths = [];
    this.pathsByNearestNeighbour = [];
  }

  @action
  generateInCircle() {
    this.cities = citiesInCircle(this.nrOfCities);
    this.paths = [];
    this.pathsByNearestNeighbour = [];
  }

  @action
  findPathByNearestNeighbour() {
    this.paths = findPathsByNearestNeighbour(this.cities);
    this.pathsByNearestNeighbour = this.paths;
  }

  @computed
  get pathLengthByNearestNeighbour() {
    return pathLength(this.pathsByNearestNeighbour);
  }
}
