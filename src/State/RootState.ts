import { action, computed, observable } from 'mobx';
import { pathLength } from './utils/points';
import { citiesByRandom, citiesInCircle, City } from './utils/cities';
import { findPathByNearestNeighbour } from './strategies/findPathByNearestNeighbour';

export class RootState {
  @observable cities: City[] = [];
  @observable path: City[] = [];
  @observable pathByNearestNeighbour: City[] = [];
  @observable nrOfCities: number = 10;
  @observable generatorChoice: any;

  constructor() {
    this.generateCitiesInCircle();
  }

  @action
  resetCities(cities: City[]) {
    this.cities = cities;
    this.path = [];
    this.pathByNearestNeighbour = [];
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
    this.path = findPathByNearestNeighbour(this.cities);
    this.pathByNearestNeighbour = this.path;
  }

  @computed
  get pathLengthByNearestNeighbour() {
    return pathLength(this.pathByNearestNeighbour);
  }
}
