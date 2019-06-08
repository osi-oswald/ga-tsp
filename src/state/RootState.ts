import { action, computed, observable, toJS } from 'mobx';
import { pathLength } from '../algorithms/common/points';
import { City, generateCitiesByRandom, generateCitiesInCircle } from '../algorithms/common/cities';
import { findPathByNearestNeighbour } from '../algorithms/math/findPathByNearestNeighbour';
import { shuffle } from '../algorithms/common';
import { findPathByGaByBook } from '../algorithms/genetic/findPathByGaByBook';
import { findPathByGaByMe } from '../algorithms/genetic/findPathByGaByMe';

export class RootState {
  @observable cities: City[] = [];
  @observable generatorChoice: any;
  @observable nrOfCities: number = 50;
  @observable path: City[] = [];
  @observable pathByNearestNeighbour: City[] = [];
  @observable pathByRandom: City[] = [];
  @observable pathByGaByBook: City[] = [];
  @observable generationsOfGaByBook: number = 0;
  @observable pathByGaByMe: City[] = [];
  @observable generationsOfGaByMe: number = 0;

  constructor() {
    this.generateCitiesByRandom();
  }

  @action
  resetCities(cities: City[]) {
    this.cities = cities;
    this.path = [];
    this.pathByNearestNeighbour = [];
    this.pathByRandom = [];
    this.pathByGaByBook = [];
    this.generationsOfGaByBook = 0;
    this.pathByGaByMe = [];
    this.generationsOfGaByMe = 0;
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
  findPathByGaByBook() {
    const result = findPathByGaByBook({
      cities: toJS(this.cities),
      populationSize: 1000,
      crossoverRate: 0.3,
      mutationRate: 0.05,
      elitismRate: 0.05,
      maxStaleGenerations: 20
    });
    this.path = result.path;
    this.pathByGaByBook = this.path;
    this.generationsOfGaByBook = result.generations;
  }

  @action
  findPathByGaByMe() {
    const result = findPathByGaByMe({
      cities: toJS(this.cities),
      populationSize: 1000,
      maxStaleGenerations: 20
    });
    this.path = result.path;
    this.pathByGaByMe = this.path;
    this.generationsOfGaByMe = result.generations;
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
  get pathLengthByGaByBook() {
    return pathLength(this.pathByGaByBook);
  }

  @computed
  get pathLengthByGaByMe() {
    return pathLength(this.pathByGaByMe);
  }
}
