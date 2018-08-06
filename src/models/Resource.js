import _ from 'lodash';
import uuid from 'uuid';

import Entity from './abstract/Entity';
import Time from './Time';

const GROWTH_RATE = 3;
const MATURITY = 5;
const LIFE_EXPECTANCY = 10;

const P_SPREAD = 0.2;
const P_DIE = 0.5;

export default class Resource extends Entity {
  constructor(amount=0) {
    super();
    this.amount = amount;

    Resource.all[this.id] = this;
  }

  step(currentStep, environment) {
    if (!this.birthday) {
      this.birthday = currentStep;
    }

    this.grow();

    if (currentStep - this.birthday > MATURITY) {
      if (Math.random() < P_SPREAD) {
        this.spread();
      }
    }

    if (currentStep - this.birthday > LIFE_EXPECTANCY) {
      if (Math.random() < P_DIE) {
        this.die();
      }
    }
  }

  grow(currentStep) {
    this.amount = Math.min(this.MAX, this.amount + GROWTH_RATE);
  }

  spread(currentStep) {
    let adjacentTiles = this.tile.getAdjacentTiles();
    let seedTarget = _.sample(adjacentTiles);
    if (!seedTarget.has(Resource)) {
      let resource = new Resource(GROWTH_RATE);
      seedTarget.add(resource);
    }
  }

  die() {
    this.tile.remove(this);
    delete Resource.all[this.id];
  }

  MAX = 20
}

Resource.all = {}
