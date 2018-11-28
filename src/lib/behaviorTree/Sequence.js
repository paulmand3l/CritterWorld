import ControlNode from './abstract/ControlNode';

class Sequence extends ControlNode {
  step() {
    for (node in this.children) {
      let val = node.step();

    }
  }
}
