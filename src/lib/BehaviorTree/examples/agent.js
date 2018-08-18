import _ from 'lodash';
import {
  Status,
  Sequence,
  Selector,
  Action
} from '../index';


/////////////////
// Useful classes
/////////////////

// Super simple resource positioned in a 1-dimensional world
class Resource {
  constructor() {
    // Randomize initial amount and location
    this.amount = _.random(5, 20);
    this.location = _.random(-20, 20);
  }
}

// Super simple agent that lives in a 1-dimensional world and
// can find and collect resources
class Agent {
  constructor() {
    this.location = 0;
    this.inventory = 0;

    // The closest resource as saved by findClosestViableResource
    // One of the quirks of behavior trees is that nodes can't talk to each
    // other, so any data passed between nodes needs to get stored oin a global
    // object, in this case, the agent
    this.closestResource = undefined;

    // The behavior tree that runs the agent
    // The whole thing is executed each tick, and the sequence will restart
    // whenever it completes
    this.behaviorTree = new Sequence(
      new Action(this.findClosestViableResource.bind(this)),
      new Action(() => this.moveTowards(this.closestResource.location)),
      new Action(() => this.collect(this.closestResource))
    );
  }

  // Look through resources and offers the closest one we haven't yet cleaned out
  findClosestViableResource({resources}) {
    // filters list of all resources to just ones with stuff left
    let viableResources = resources.filter(res => res.amount > 0);

    // Fail if we can't find any
    if (viableResources.length == 0) {
      // need to explicitly return FAILURE here so the behavior tree picks it up
      return Status.FAILURE;
    }

    // This just finds the closest resource
    // ---------------
    var closestResource = undefined;
    var closestDistance = 99999;

    viableResources.forEach(resource => {
      let distance = Math.abs(resource.location - this.location);
      if (distance < closestDistance) {
        closestResource = resource;
        closestDistance = distance;
      }
    });
    // --------------

    // Store the closest resource. Since we can't pass data to other nodes in the
    // behavior tree, we store it for the other node to look up later
    this.closestResource = closestResource;

    console.log("Spotted resource with", closestResource.amount, "units at position", closestResource.location);
  }

  // Move us towards a given location
  moveTowards(location) {
    console.log("Moving from", this.location, "towards", location);

    let distance = location - this.location;

    if (Math.abs(distance) > 0) {
      // Take a step towards the target location
      this.location += Math.sign(location - this.location);
      // Need to explicitly return RUNNING status so behavior tree picks it up
      return Status.RUNNING;
    }

    // no explicit return when distance == 0 means "return undefined"
    // Action node understands "undefined" to mean SUCCESS
    // We could also explicitly "return Status.SUCCESS" here
  }

  // Harvest resources and add them to our inventory
  collect(resource) {
    // If we're not a the same location as the resource, collection fails
    if (this.location !== resource.location) {
      return Status.FAILURE;
    }

    console.log("Collecting", resource.amount, "from resource at", resource.location);

    // Move units from the resource to our inventory.
    this.inventory += resource.amount;
    resource.amount = 0;
  }

  // Step function advances the behavior tree given the current state of the world
  step(worldState) {
    return this.behaviorTree.step(worldState);
  }
}



///////////////
// Main code
//
// Run this with "npx babel-node --presets env -- examples/agent.js"
// From BehaviorTree/
///////////////

// Creating the agent
const agent = new Agent();

// Initializing world state
const state = {
  resources: [1, 2, 3, 4, 5].map(() => new Resource())
};

console.log("Initial State", state);

// Loop until the agent fails at finding viable resources or collecting them
let status = undefined;
do {
  status = agent.step(state);
} while (status !== Status.FAILURE);

console.log("Done.");
