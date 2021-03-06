import uuid from 'uuid';
import Status from '../Status';

class Node {
  constructor() {
    this.id = uuid();
  }

  step() {
    throw new Error("Running step method of raw abstract Node.");
  }

  reset() {
    // This is for composites that track children
  }
}

export default Node;
