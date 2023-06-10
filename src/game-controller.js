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
    this.#io.stop();
    this.#game.printEndResult(this.#io);
  }

  start() {
    this.#game.startGame(this.#io);
    this.#io.readChar(this.#consolidateMoveInGame.bind(this));
  }

  stop() {
    this.#io.stop();
  }
}

exports.GameController = GameController;