import _ from 'lodash';
import Status from '../Status';
import Node from '../abstract/Node';

class Sequence extends Node {
  constructor(...children) {
    super();

    // Allow passing children as array or as args
    if (children.length == 1 && _.isArray(children[0])) {
      children = children[0];
    }

    this.children = children;
    this.indexOfLastRunningChild = undefined;
  }

  step() {
    let startingIndex = this.indexOfLastRunningChild || 0;
    this.indexOfLastRunningChild = undefined;

    for (let i = startingIndex; i < this.children.length; i++) {
      let child = this.children[i];
      const status = child.step();

      switch (status) {
        case Status.SUCCESS:
          continue;
        break;

        case Status.FAILURE:
          return Status.FAILURE;
        break;

        case Status.RUNNING:
          this.indexOfLastRunningChild = i;
          return Status.RUNNING;
        break;
      }
    }

    return Status.SUCCESS;
  }
}

export default Sequence;
