import _ from 'lodash';
import Status from '../Status';
import Composite from './Composite';

class Sequence extends Composite {
  constructor(...children) {
    super(...children);
    this.indexOfLastRunningChild = undefined;
  }

  step(state) {
    let startingIndex = this.indexOfLastRunningChild || 0;
    this.indexOfLastRunningChild = undefined;

    for (let i = startingIndex; i < this.children.length; i++) {
      let child = this.children[i];
      const status = child.step(state);

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
