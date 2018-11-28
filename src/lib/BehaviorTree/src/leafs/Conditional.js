import Node from '../abstract/Node';
import Status from '../Status';

class Conditional extends Node {
  constructor(test) {
    super();
    this.test = test;
  }

  step(state) {
    return this.test(state) ? Status.SUCCESS : Status.FAILURE;
  }
}

export default Conditional;
