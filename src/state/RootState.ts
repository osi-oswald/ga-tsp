import { action, computed, observable } from 'mobx';
import { pathLength } from '../algorithms/common/points';
import { generateCitiesByRandom, generateCitiesInCircle, City } from '../algorithms/common/cities';
import { findPathByNearestNeighbour } from '../algorithms/math/findPathByNearestNeighbour';
import { shuffle } from '../algorithms/common';

export class RootState {
  @observable cities: City[] = [];
  @observable path: City[] = [];
  @observable pathByNearestNeighbour: City[] = [];
  @observable pathByRandom: City[] = [];
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
    this.pathByRandom = [];
  }

  @action
  generateByLastChoice() {
    this.generatorChoice();
  }

  @action
  generateCitiesByRandom() {
    this.resetCities(generateCitiesByRandom(this.nrOfCities));
    this.generatorChoice = this.generateCitiesByRandom;
  }

  @action
  generateCitiesInCircle() {
    this.resetCities(generateCitiesInCircle(this.nrOfCities));
    this.generatorChoice = this.generateCitiesInCircle;
  }

  @action
  findPathByNearestNeighbour() {
    this.path = findPathByNearestNeighbour(this.cities);
    this.pathByNearestNeighbour = this.path;
  }

  @action
  findPathByRandom() {
    this.path = shuffle(this.cities);
    this.pathByRandom = this.path;
  }

  @computed
  get pathLengthByNearestNeighbour() {
    return pathLength(this.pathByNearestNeighbour);
  }

  @computed
  get pathLengthByRandom() {
    return pathLength(this.pathByRandom);
  }
}
