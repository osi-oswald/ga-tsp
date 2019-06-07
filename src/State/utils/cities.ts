import { Point } from './points';

export let cityId = 1;

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

export function citiesInCircle(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(cityByAngle((360 * i) / nrOfCities));
  }
  return cities;
}
