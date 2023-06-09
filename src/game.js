const WINNING_SEQUENCES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const PLAYER_COUNT = 2;

class Game {
  #players;
  #board;
  #totalMoves;
  #gameOver;
  #hasWinner;
  #controller;
  #winner;
  #currentPlayer;

  constructor(players, board, controller) {
    this.#players = players;
    this.#board = board;
    this.#totalMoves = 0;
    this.#gameOver = false;
    this.#hasWinner = false;
    this.#controller = controller;
  }

  #hasWon(player) {
    return WINNING_SEQUENCES.some(sequence => {
      return sequence.every(element => player.moves.includes(element));
    });
  }

  #promptPlayer() {
    const name = this.#currentPlayer.name;
    const icon = this.#currentPlayer.icon;
    console.log(`${name}'s turn [${icon}]`);
  }

  #printUsage() {
    console.log(`Enter 'q' to quit`);
  }

  #startGame() {
    this.#board.render(console);
    this.#currentPlayer = this.#players[0];
    this.#promptPlayer();
    this.#printUsage();
  }

  #consolidateMove(move) {
    if (move === 'q') {
      this.#controller.emit('end');
      return;
    }

    const currentPlayer = this.#currentPlayer;
    const board = this.#board;
    const boxNumber = +move - 1;

    if (board.hasAvailableSpaceFor(boxNumber)) {
      board.put(boxNumber, currentPlayer.icon);
      currentPlayer.updateMoves(boxNumber);
      this.#totalMoves++;
    }

    board.render(console);

    if (this.#hasWon(currentPlayer)) {
      this.#gameOver = true;
      this.#hasWinner = true;
      this.#winner = currentPlayer;
    }

    this.#gameOver = this.#totalMoves === 9 ? true : this.#gameOver;

    if (this.#gameOver) {
      this.#controller.emit('end');
      return;
    }

    this.#currentPlayer = this.#players[this.#totalMoves % PLAYER_COUNT];
    this.#promptPlayer();
    this.#printUsage();
  }

  #printEndResult() {
    const result = this.#hasWinner ? `winner: ${this.#winner.name}` : 'It is a draw';
    console.log('Game Ended -', result);
    this.#controller.stop();
  }

  start() {
    this.#controller.on('start', this.#startGame.bind(this));
    this.#controller.on('move', this.#consolidateMove.bind(this));
    this.#controller.on('end', this.#printEndResult.bind(this));
    const controller = this.#controller.start();
    controller.on('data', (data) => this.#controller.emit('move', data));
  }
}

exports.Game = Game;