const EventEmitter = require('events');

class GameController extends EventEmitter {
  #io;
  #game;

  constructor(io, game) {
    super();
    this.#io = io;
    this.#game = game;
  }

  startGame() {
    this.#game.startGame();
  }

  consolidateMoveInGame(move) {
    if (move === 'q') {
      this.emit('end');
      return;
    }

    this.#game.consolidateMove(move);
    if (this.#game.isOver) this.emit('end');
  }

  endGame() {
    this.#io.stdin.destroy();
    this.#game.printEndResult();
  }

  start() {
    this.on('start', this.startGame);
    this.on('move', this.consolidateMoveInGame);
    this.on('end', this.endGame);
    this.emit('start');
    this.#io.stdin.setEncoding('utf-8');
    this.#io.stdin.setRawMode(true);
    this.#io.stdin.on('data', (data) => this.emit('move', data));
  }

  stop() {
    this.#io.stdin.destroy();
  }
}

exports.GameController = GameController;