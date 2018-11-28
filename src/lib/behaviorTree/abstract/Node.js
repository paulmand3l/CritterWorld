import uuid from 'uuid';

export default class Node {
  constructor() {
    this.id = uuid();
  }

  step() {
    console.log("You should probably override this");
  }
}
