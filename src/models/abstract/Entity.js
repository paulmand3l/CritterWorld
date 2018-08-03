import uuid from 'uuid';

export default class Entity {
  constructor() {
    this.id = uuid();
  }
}
