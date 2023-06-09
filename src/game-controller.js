const EventEmitter = require('events');

class GameController {
  #io;
  #eventEmitter;

  constructor(io) {
    this.#io = io;
    this.#eventEmitter = new EventEmitter();
  }

  on(eventName, listener) {
    this.#eventEmitter.on(eventName, listener);
  }

  emit(eventName, data) {
    this.#eventEmitter.emit(eventName, data);
  }

  start() {
    this.#eventEmitter.emit('start');
    this.#io.stdin.setEncoding('utf-8');
    return this.#io.stdin.setRawMode(true);
  }

  stop() {
    this.#io.stdin.destroy();
  }
}

exports.GameController = GameController;