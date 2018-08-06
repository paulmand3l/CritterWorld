import Environment from './models/Environment';
import Agent from './models/Agent';
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
      let agent = new Agent();
      this.environment.getRandomTile().add(agent);
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

    _.forEach(Agent.all, agent => {
      agent.step(currentStep, this.environment);
      // getVisibleState
      // getPossibleActions
      // agent.step(state, actions)
    });
  }
}
