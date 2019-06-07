import { action, computed, observable } from 'mobx';

export let cityId = 1;

export interface Point {
  x: number;
  y: number;
}

export interface City extends Point {
  id: number;
}

export function cityByRandom(): City {
  return {
    id: cityId++,
    x: Math.random(),
    y: Math.random()
  };
}

export function cityByAngle(degree: number): City {
  const in2Pi = (2 * Math.PI * degree) / 360;
  return {
    id: cityId++,
    x: Math.cos(in2Pi) * 0.5 + 0.5,
    y: Math.sin(in2Pi) * 0.5 + 0.5
  };
}

export function citiesByRandom(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(cityByRandom());
  }
  return cities;
}

export function distance(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function pathLength(paths: Point[]) {
  return Math.round(
    paths.reduce((sum, city, i) => {
      const iNext = i === paths.length - 1 ? 0 : i + 1;
      return sum + distance(city, paths[iNext]);
    }, 0)
  );
}

export function findPathsByNearestNeighbour<T extends Point>(points: T[]): T[] {
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

export function citiesInCircle(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(cityByAngle((360 * i) / nrOfCities));
  }
  return cities;
}

export class RootState {
  @observable cities: City[] = [];
  @observable paths: City[] = [];
  @observable pathsByNearestNeighbour: City[] = [];
  @observable nrOfCities: number = 10;
  @observable generatorChoice: any;

  constructor() {
    this.generateCitiesInCircle();
  }

  @action
  resetCities(cities: City[]) {
    this.cities = cities;
    this.paths = [];
    this.pathsByNearestNeighbour = [];
  }

  @action
  generateByLastChoice() {
    this.generatorChoice();
  }

  @action
  generateCitiesByRandom() {
    this.resetCities(citiesByRandom(this.nrOfCities));
    this.generatorChoice = this.generateCitiesByRandom;
  }

  @action
  generateCitiesInCircle() {
    this.resetCities(citiesInCircle(this.nrOfCities));
    this.generatorChoice = this.generateCitiesInCircle;
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
