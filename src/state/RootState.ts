import { action, observable } from 'mobx';

export const scale = 1000;

export interface City {
  x: number;
  y: number;
}

export function randomCity(): City {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale
  };
}

export function randomCities(nrOfCities: number) {
  const cities: City[] = [];
  for (let i = 0; i < nrOfCities; i++) {
    cities.push(randomCity());
  }
  return cities;
}

export class RootState {
  readonly scale: number = scale;
  @observable cities: City[] = [{ x: 0, y: 0 }, { x: scale, y: scale }];
  @observable nrOfCities: number = 10;

  @action
  generateRandom() {
    this.cities = randomCities(this.nrOfCities);
  }
}
