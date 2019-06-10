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
  @observable terminateGaByBook?: Function;

  @observable pathByGaByMe: City[] = [];
  @observable generationsOfGaByMe: number = 0;
  @observable populationOfGaByMe: number = 1000;
  @observable terminateGaByMe?: Function;

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
    this.nrOfCities = Math.max(this.nrOfCities || 0, 3);
    this.resetCities(generateCitiesByRandom(this.nrOfCities));
    this.generatorChoice = this.generateCitiesByRandom;
  }

  @action
  generateCitiesInCircle() {
    this.nrOfCities = Math.max(this.nrOfCities || 0, 3);
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
    this.populationOfGaByBook = Math.max(this.populationOfGaByBook || 0, 2);
    this.crossoverRateOfGaByBook = Math.max(this.crossoverRateOfGaByBook || 0, 0);
    this.crossoverRateOfGaByBook = Math.min(this.crossoverRateOfGaByBook || 0, 1);
    this.mutationRateOfGaByBook = Math.max(this.mutationRateOfGaByBook || 0, 0);
    this.mutationRateOfGaByBook = Math.min(this.mutationRateOfGaByBook || 0, 1);
    this.elitismRateOfGaByBook = Math.max(this.elitismRateOfGaByBook || 0, 0);
    this.elitismRateOfGaByBook = Math.min(this.elitismRateOfGaByBook || 0, 1);

    this.terminateGaByBook = findPathByGaByBook({
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

        if (report.isTerminated) {
          this.terminateGaByBook = undefined;
        }
      }
    });
  }

  @action
  findPathByGaByMe() {
    this.populationOfGaByMe = Math.max(this.populationOfGaByMe || 0, 2);

    this.terminateGaByMe = findPathByGaByMe({
      cities: toJS(this.cities),
      populationSize: this.populationOfGaByMe,
      maxStaleGenerations: 20,
      reporting: report => {
        this.path = report.path;
        this.pathByGaByMe = report.path;
        this.generationsOfGaByMe = report.generations;

        if (report.isTerminated) {
          this.terminateGaByMe = undefined;
        }
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
