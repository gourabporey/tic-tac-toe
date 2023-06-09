class GameController {
  #io;

  constructor(io) {
    this.#io = io;
  }

  start() {
    this.#io.stdin.setEncoding('utf-8');
    return this.#io.stdin.setRawMode(true);
  }
}

exports.GameController = GameController;