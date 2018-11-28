import _ from 'lodash';
import {
  Status,
  Action,
  Selector,
  Sequence
} from '../index';

const moveTowards = (destination) => {
  let distance = _.random(10, 20);

  const step = () => {
    if (distance > 0) {
      console.log("Moving towards", destination);
      distance = distance - 1;
      return Status.RUNNING;
    } else {
      console.log("Arrived at", destination);
      return Status.SUCCESS;
    }
  }

  return step;
}

let openUnlockedDoor = new Action(() => console.log("Opening the door"));

let openLockedDoor = new Sequence(
  new Action(() => console.log("Unlocking the door")),
  openUnlockedDoor
);

let openDoor = new Selector(
  openUnlockedDoor,
  openLockedDoor,
  new Action(() => console.log("Smashing the door"))
);

let getInThroughTheDoor = new Sequence(
  new Action(moveTowards("the door")),
  openDoor,
  new Action(moveTowards("the interior")),
  new Action(() => console.log("Closing the door"))
)



var status;

do {
  status = getInThroughTheDoor.step();
} while (status !== Status.SUCCESS)
