import Status from '../Status';
import Decorator from './Decorator';

class IgnoreFailure extends Decorator {
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
