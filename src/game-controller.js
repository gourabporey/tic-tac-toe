const EventEmitter = require('events');

class GameController extends EventEmitter {
  #io;
  #game;

  constructor(io, game) {
    super();
    this.#io = io;
    this.#game = game;
  }

  #consolidateMoveInGame(move) {
    if (move === 'q') {
      this.#endGame();
      return;
    }

    this.#game.consolidateMove(move);
    if (this.#game.isOver) this.#endGame();
  }

  #endGame() {
    this.#io.stdin.destroy();
    this.#game.printEndResult();
  }

  start() {
    this.#game.startGame();
    this.#io.stdin.setEncoding('utf-8');
    this.#io.stdin.setRawMode(true);
    this.#io.stdin.on('data', this.#consolidateMoveInGame.bind(this));
  }

  stop() {
    this.#io.stdin.destroy();
  }
}

exports.GameController = GameController;