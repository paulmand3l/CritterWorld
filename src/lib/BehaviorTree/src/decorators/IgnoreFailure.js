import Status from '../Status';
import Decorator from './Decorator';

class IgnoreFailure extends Decorator {
  step(state) {
    const status = this.child.step(state);

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
