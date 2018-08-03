import _ from 'lodash';

import Entity from './abstract/Entity';
import Tile from './Tile';

const mod = (n, m) => {
  return ((n % m) + m) % m;
}

let isSameLocation = (loc1, loc2) => {
  return loc1.row === loc2.row && loc1.col === loc2.col;
}

export default class Environment extends Entity {
  constructor(width=20, height=20) {
    super();

    this.width = width;
    this.height = height;

    this.tiles = {};
    this.map = [];

    for (let row = 0; row < this.height; row++) {
      this.map.push([]);

      for (let col = 0; col < this.width; col++) {
        let tile = new Tile({row, col}, this);
        this.tiles[tile.id] = tile;

        this.map[row].push(tile);
      }
    }
  }

  getRandomTile() {
    let location = {
      row: Math.floor(Math.random() * this.height),
      col: Math.floor(Math.random() * this.width),
    }

    return this.getTile(location);
  }

  getTile({row, col}) {
    row = mod(row, this.height);
    col = mod(col, this.width);
    return this.map[row][col];
  }
}
