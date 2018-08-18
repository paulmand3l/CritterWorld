import Status from '../Status';
import Node from '../abstract/Node';

class IgnoreFailure extends Node {
  constructor(child) {
    super();
    this.child = child;
  }

  step() {
    const status = this.child.step();

    switch (status) {
      case Status.SUCCESS:
        return Status.SUCCESS;
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

export default IgnoreFailure;
