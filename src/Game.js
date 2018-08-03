import Environment from './models/Environment';
import Critter from './models/Critter';
import Resource from './models/Resource'

const WIDTH = 20;
const HEIGHT = 20
const STARTING_AGENTS = 10;
const STARTING_RESOURCES = 10;

export default class Game {
  constructor() {
    this.environment = new Environment(WIDTH, HEIGHT);
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < STARTING_AGENTS; i++) {
      let critter = new Critter();
      this.environment.getRandomTile().add(critter);
    }

    for (let i = 0; i < STARTING_RESOURCES; i++) {
      let resource = new Resource();
      this.environment.getRandomTile().add(resource);
    }
  }

  step(currentStep) {
    this.currentStep++;
    _.forEach(Resource.all, res => {
      res.step(currentStep, this.environment);
    });

    _.forEach(Critter.all, critter => {
      // getVisibleState
      // getPossibleActions
      // critter.step(state, actions)
    });
  }
}
