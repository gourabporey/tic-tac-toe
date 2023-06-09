const EventEmitter = require('events');

class GameController extends EventEmitter {
  #io;

  constructor(io) {
    super();
    this.#io = io;
  }

  start() {
    this.emit('start');
    this.#io.stdin.setEncoding('utf-8');
    return this.#io.stdin.setRawMode(true);
  }

  stop() {
    this.#io.stdin.destroy();
  }
}

exports.GameController = GameController;