import Status from '../Status';
import Node from '../abstract/Node';

class Invert extends Node {
  constructor(child) {
    super();
    this.child = child;
  }

  step() {
    const status = this.child.step();

    switch (status) {
      case Status.SUCCESS:
        return Status.FAILURE;
      break;

      case Status.FAILURE:
        return Status.SUCCESS;
      break;

      case Status.RUNNING:
        return Status.RUNNING;
      break;
    }
  }
}

export default Invert;
