import EventEmitter from 'events';

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.running = false;
    this.fps = 60;
    this.skippedFrames = 0;
    this.currentStep = 0;
  }

  play() {
    this.running = true;
    requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    if (this.running) {
      requestAnimationFrame(this.loop.bind(this));

      if (this.skippedFrames < 60 / this.fps - 1) {
        this.skippedFrames++;
      } else {
        this.skippedFrames = 0;
        this.step();
      }
    }
  }

  pause() {
    this.running = false;
  }

  reset() {
    this.emit('reset');
    window.location = window.location;
  }

  step() {
    this.currentStep++;
    this.emit('step', this.currentStep)
  }
}
