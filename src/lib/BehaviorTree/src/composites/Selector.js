import Status from '../Status';
import Composite from './Composite';

class Selector extends Composite {
  constructor(...children) {
    super(...children);
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
          return Status.SUCCESS;
        break;

        case Status.FAILURE:
          continue;
        break;

        case Status.RUNNING:
          this.indexOfLastRunningChild = i;
          return Status.RUNNING;
        break;
      }
    }

    return Status.FAILURE;
  }
}

export default Selector;
