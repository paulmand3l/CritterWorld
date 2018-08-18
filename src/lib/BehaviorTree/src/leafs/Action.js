import Status from '../Status';
import Node from '../abstract/Node';

class Action extends Node {
  constructor(action) {
    super();
    this.action = action;
  }

  step() {
    const status = this.action();

    // Allow simple statements like console.log
    if (typeof status === 'undefined') {
      return Status.SUCCESS;
    }

    return status;
  }
}

export default Action;
