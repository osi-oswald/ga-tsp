import { action, observable } from 'mobx';

export const scale = 1000;

export interface City {
  x: number;
  y: number;
}

export function cityByRandom(): City {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale
  };
}

export function cityByAngle(degree: number): City {
  const in2Pi = (2 * Math.PI * degree) / 360;
  const halfScale = scale / 2;
  return {
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

export function citiesInCircle(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(cityByAngle((360 * i) / nrOfCities));
  }
  return cities;
}

export class RootState {
  readonly scale: number = scale;
  @observable cities: City[] = [{ x: 0, y: 0 }, { x: scale, y: scale }];
  @observable nrOfCities: number = 10;

  @action
  generateByRandom() {
    this.cities = citiesByRandom(this.nrOfCities);
  }

  @action
  generateInCircle() {
    this.cities = citiesInCircle(this.nrOfCities);
  }
}