import _ from 'lodash';
import uuid from 'uuid';

import Entity from './abstract/Entity';
import Time from './Time';

export default class Resource extends Entity {
  MAX_AMOUNT = 20

  constructor(amount=0) {
    super();
    this.amount = amount;

    this.GROWTH_RATE = 3;
    this.MATURITY = 5;
    this.LIFE_EXPECTANCY = 10;

    this.P_SPREAD = 0.2;
    this.P_DIE = 0.5;

    Resource.all[this.id] = this;
  }

  step(currentStep, environment) {
    if (!this.birthday) {
      this.birthday = currentStep;
    }

    this.grow();

    if (currentStep - this.birthday > this.MATURITY) {
      if (Math.random() < this.P_SPREAD) {
        this.spread();
      }
    }

    if (currentStep - this.birthday > this.LIFE_EXPECTANCY) {
      if (Math.random() < this.P_DIE) {
        this.die();
      }
    }
  }

  grow(currentStep) {
    this.amount = Math.min(this.MAX_AMOUNT, this.amount + this.GROWTH_RATE);
  }

  spread(currentStep) {
    let adjacentTiles = this.tile.getAdjacentTiles();
    let seedTarget = _.sample(adjacentTiles);
    if (!seedTarget.has(Resource)) {
      let resource = new Resource(this.GROWTH_RATE);
      seedTarget.add(resource);
    }
  }

  die() {
    this.tile.remove(this);
    delete Resource.all[this.id];
  }
}

Resource.all = {}
