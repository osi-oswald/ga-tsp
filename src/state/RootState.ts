import { action, computed, observable, toJS } from 'mobx';
import { pathLength } from '../algorithms/common/points';
import { City, generateCitiesByRandom, generateCitiesInCircle } from '../algorithms/common/cities';
import { findPathByNearestNeighbour } from '../algorithms/math/findPathByNearestNeighbour';
import { findPathByGaByBook } from '../algorithms/genetic/findPathByGaByBook';
import { findPathByGaByMe } from '../algorithms/genetic/findPathByGaByMe';
import { shuffle } from '../algorithms/common/shuffle';

export class RootState {
  @observable cities: City[] = [];
  @observable generatorChoice: any;
  @observable nrOfCities: number = 50;
  @observable path: City[] = [];

  @observable pathByNearestNeighbour: City[] = [];

  @observable pathByRandom: City[] = [];

  @observable pathByGaByBook: City[] = [];
  @observable generationsOfGaByBook: number = 0;
  @observable populationOfGaByBook: number = 1000;
  @observable crossoverRateOfGaByBook: number = 0.3;
  @observable mutationRateOfGaByBook: number = 0.05;
  @observable elitismRateOfGaByBook: number = 0.05;

  @observable pathByGaByMe: City[] = [];
  @observable generationsOfGaByMe: number = 0;
  @observable populationOfGaByMe: number = 1000;

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
    findPathByGaByBook({
      cities: toJS(this.cities),
      populationSize: this.populationOfGaByBook,
      crossoverRate: this.crossoverRateOfGaByBook,
      mutationRate: this.mutationRateOfGaByBook,
      elitismRate: this.elitismRateOfGaByBook,
      maxStaleGenerations: 20,
      reporting: report => {
        this.path = report.path;
        this.pathByGaByBook = report.path;
        this.generationsOfGaByBook = report.generations;
      }
    });
  }

  @action
  findPathByGaByMe() {
    findPathByGaByMe({
      cities: toJS(this.cities),
      populationSize: this.populationOfGaByMe,
      maxStaleGenerations: 20,
      reporting: report => {
        this.path = report.path;
        this.pathByGaByMe = report.path;
        this.generationsOfGaByMe = report.generations;
      }
    });
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
