import Status from '../Status';
import Node from '../abstract/Node';

class Composite extends Node {
  constructor(...children) {
    super();

    // Allow passing children as array or as args
    if (children.length == 1 && _.isArray(children[0])) {
      children = children[0];
    }

    this.children = children;
  }

  reset() {
    this.children.forEach(child => child.reset());
  }
}

export default Composite;
