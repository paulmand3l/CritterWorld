import Status from '../Status';
import Decorator from './Decorator';

class Invert extends Decorator {
  step(state) {
    const status = this.child.step(state);

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
