import Status from '../Status';
import Node from '../abstract/Node';

class Decorator extends Node {
  constructor(child) {
    super();
    this.child = child;
  }

  step(state) {
    return this.child.step(state);
  }

  reset() {
    this.child.reset();
  }
}

export default Decorator;
