import _ from 'lodash';
import uuid from 'uuid';

import Entity from './abstract/Entity';

const GROWTH_RATE = 3;

export default class Resource extends Entity {
  constructor(amount=16) {
    super();
    this.amount = amount;

    Resource.all[this.id] = this;
  }

  step(currentStep, environment) {
    if (this.amount < this.MAX) {
      this.grow();
    } else {
      this.spread();
    }
  }

  grow() {
    this.amount = Math.min(this.amount + GROWTH_RATE);
  }

  spread() {
    let adjacentTiles = this.tile.getAdjacentTiles();
    let seedTarget = _.sample(adjacentTiles);
    if (!seedTarget.has(Resource)) {
      let resource = new Resource(GROWTH_RATE);
      seedTarget.add(resource);
    }
  }

  MAX = 20
}

Resource.all = {}
