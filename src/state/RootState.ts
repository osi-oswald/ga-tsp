import { action, computed, observable } from 'mobx';
import { pathLength } from '../algorithms/common/points';
import { City, generateCitiesByRandom, generateCitiesInCircle } from '../algorithms/common/cities';
import { findPathByNearestNeighbour } from '../algorithms/math/findPathByNearestNeighbour';
import { shuffle } from '../algorithms/common';
import { findPathByGaClassic } from '../algorithms/genetic/findPathByGaClassic';

export class RootState {
  @observable cities: City[] = [];
  @observable path: City[] = [];
  @observable pathByNearestNeighbour: City[] = [];
  @observable pathByRandom: City[] = [];
  @observable pathByGaClassic: City[] = [];
  @observable generationsOfGaClassic: number = 0;
  @observable nrOfCities: number = 15;
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
    this.pathByGaClassic = [];
    this.generationsOfGaClassic = 0;
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

  @action
  findPathByGaClassic() {
    const result = findPathByGaClassic({
      cities: this.cities,
      populationSize: 1000,
      crossoverRate: 0.3,
      mutationRate: 0.05,
      elitismRate: 0.05,
      maxStaleGenerations: 20
    });
    this.path = result.path;
    this.pathByGaClassic = this.path;
    this.generationsOfGaClassic = result.generations;
  }

  @computed
  get pathLengthByNearestNeighbour() {
    return pathLength(this.pathByNearestNeighbour);
  }

  @computed
  get pathLengthByRandom() {
    return pathLength(this.pathByRandom);
  }

  @computed
  get pathLengthByGaClassic() {
    return pathLength(this.pathByGaClassic);
  }
}
