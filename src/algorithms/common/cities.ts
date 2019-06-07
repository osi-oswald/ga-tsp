import { Point } from './points';

export let cityId = 1;

export interface City extends Point {
  id: number;
}

export function newCityByRandom(): City {
  return {
    id: cityId++,
    x: Math.random(),
    y: Math.random()
  };
}

export function newCityByAngle(degree: number): City {
  const in2Pi = (2 * Math.PI * degree) / 360;
  return {
    id: cityId++,
    x: Math.cos(in2Pi) * 0.5 + 0.5,
    y: Math.sin(in2Pi) * 0.5 + 0.5
  };
}

export function generateCitiesByRandom(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(newCityByRandom());
  }
  return cities;
}

export function generateCitiesInCircle(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(newCityByAngle((360 * i) / nrOfCities));
  }
  return cities;
}
