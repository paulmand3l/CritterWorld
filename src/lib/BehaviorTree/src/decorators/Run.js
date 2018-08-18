import Status from '../Status';
import Decorator from './Decorator';

class RunUntil extends Decorator {
  constructor(status, child) {
    super(child);
    this.runUntilStatus = status;
  }

  step(state) {
    const status = this.child.step(state);

    if (status === this.runUntilStatus) {
      return status;
    } else {
      return Status.RUNNING;
    }

  }
}

class RunUntilSuccess extends RunUntil {
  constructor(child) {
    super(Status.SUCCESS, child);
  }
}

class RunUntilFailure extends RunUntil {
  constructor(child) {
    super(Status.FAILURE, child);
  }
}

export {
  RunUntil,
  RunUntilSuccess,
  RunUntilFailure,
};
