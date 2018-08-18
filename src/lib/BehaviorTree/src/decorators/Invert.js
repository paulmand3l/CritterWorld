import Status from '../Status';
import Decorator from './Decorator';

class Invert extends Decorator {
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
