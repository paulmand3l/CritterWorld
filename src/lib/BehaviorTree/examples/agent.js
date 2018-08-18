import _ from 'lodash';
import {
  Status,
  Sequence,
  Selector,
  Action
} from '../index';

class Resource {
  constructor() {
    this.amount = _.random(5, 20);
    this.location = _.random(-20, 20);
  }
}


class Agent {
  constructor() {
    this.location = 0;
    this.resources = 0;

    this.closestResource = undefined;

    this.behaviorTree = new Sequence(
      new Action(this.findClosestViableResource.bind(this)),
      new Action(() => this.moveTowards(this.closestResource.location)),
      new Action(() => this.collect(this.closestResource))
    );
  }

  findClosestViableResource({resources}) {
    let viableResources = resources.filter(res => res.amount > 0);

    if (viableResources.length == 0) {
      return Status.FAILURE;
    }

    var closestResource = undefined;
    var closestDistance = 99999;

    viableResources.forEach(resource => {
      let distance = Math.abs(resource.location - this.location);
      if (distance < closestDistance) {
        closestResource = resource;
        closestDistance = distance;
      }
    });

    console.log("Spotted resource with", closestResource.amount, "units at position", closestResource.location);
    this.closestResource = closestResource;
  }

  moveTowards(location) {
    console.log("Moving from", this.location, "towards", location);
    let distance = location - this.location;
    if (distance == 0) {
      return Status.SUCCESS;
    } else {
      this.location += Math.sign(location - this.location);
      return Status.RUNNING;
    }
  }

  collect(resource) {
    if (this.location !== resource.location) {
      return Status.FAILURE;
    }

    console.log("Collecting", resource.amount, "from resource at", resource.location);
    this.resources += resource.amount;
    resource.amount = 0;
  }

  step(worldState) {
    return this.behaviorTree.step(worldState);
  }
}


const agent = new Agent();
const state = {
  resources: [1, 2, 3, 4, 5].map(() => new Resource())
};

console.log(state);

let status = undefined;
do {
  status = agent.step(state);
} while (status !== Status.FAILURE);
