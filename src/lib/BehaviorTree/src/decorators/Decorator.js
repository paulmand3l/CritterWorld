import Status from '../Status';
import Node from '../abstract/Node';

class Decorator extends Node {
  constructor(child) {
    super();
    this.child = child;
  }

  step() {
    return this.child.step();
  }

  reset() {
    this.child.reset();
  }
}

export default Decorator;
