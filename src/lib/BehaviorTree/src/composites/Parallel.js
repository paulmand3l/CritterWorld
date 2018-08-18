import Status, { isSuccess, isFailure } from '../Status';
import Composite from './Composite';

class ParallelAny extends Composite {
  constructor(...children) {
    super(...children);
  }

  step() {
    let results = this.children.map(child => child.step());

    let someSuccess = results.some(isSuccess);
    let allFailure = results.every(isFailure);

    if (someSuccess) {
      this.reset();
      return Status.SUCCESS;
    } else if (allFailure) {
      this.reset();
      return Status.FAILURE;
    } else {
      return Status.RUNNING;
    }
  }
}


class ParallelAll extends Composite {
  constructor(...children) {
    super(...children);
  }

  step() {
    let results = this.children.map(child => child.step());

    let someFailure = results.some(isFailure);
    let allSuccess = results.every(isSuccess);

    if (allSuccess) {
      this.reset();
      return Status.SUCCESS;
    } else if (someFailure) {
      this.reset();
      return Status.FAILURE;
    } else {
      return Status.RUNNING;
    }
  }
}


export {
  ParallelAny,
  ParallelAll
}
