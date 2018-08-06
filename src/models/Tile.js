import _ from 'lodash';
import uuid from 'uuid';

import Entity from './abstract/Entity';

const isItemOfType = _.curry((type, item) => item.constructor.name === type.name);

export default class Tile extends Entity {
  constructor(location, environment) {
    super();
    this.location = location;
    this.environment = environment;
    this.contents = {};

    Tile.all[this.id] = this;
  }

  add(payload) {
    payload.tile = this;
    this.contents = {...this.contents, [payload.id]: payload};
    return payload.id;
  }

  remove(payload) {
    delete payload.tile;
    if (payload.id in this.contents) {
      this.contents = _.omit(this.contents, payload.id);
      return payload.id;
    }
  }

  get(type) {
    return _.pickBy(this.contents, isItemOfType(type));
  }

  has(type) {
    return _.size(this.get(type));
  }

  getAdjacentTiles() {
    let {row, col} = this.location;

    let adjacentLocations = [
      {row, col: col + 1},
      {row, col: col - 1},
      {row: row + 1, col},
      {row: row - 1, col},
    ]

    let adjacentTiles = {};

    adjacentLocations.forEach((location) => {
      let tile = this.environment.getTile(location);
      adjacentTiles[tile.id] = tile;
    });

    return adjacentTiles;
  }
}

Tile.all = {};
