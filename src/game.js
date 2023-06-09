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

class Game {
  #players;
  #board;
  #totalMoves;
  #isOver;
  #hasWinner;
  #winner;
  #currentPlayer;
  #playersCount;

  constructor(players, board) {
    this.#players = players;
    this.#playersCount = players.length;
    this.#board = board;
    this.#totalMoves = 0;
    this.#isOver = false;
    this.#hasWinner = false;
  }

  get isOver() {
    return this.#isOver;
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

  #getBoxNumber(move) {
    return +move - 1;
  }

  #choosePlayer() {
    return this.#players[this.#totalMoves % this.#playersCount];
  }

  #updateBoard(boxNumber) {
    const board = this.#board;
    const currentPlayer = this.#currentPlayer;

    if (board.hasAvailableSpaceFor(boxNumber)) {
      board.put(boxNumber, currentPlayer.icon);
      currentPlayer.updateMoves(boxNumber);
      this.#totalMoves++;
    }

    board.render(console);

    if (this.#hasWon(currentPlayer)) {
      this.#isOver = true;
      this.#hasWinner = true;
      this.#winner = currentPlayer;
    }

    this.#isOver = this.#totalMoves === 9 ? true : this.#isOver;
  }

  #changeCurrentPlayer() {
    if (!this.#isOver) {
      this.#currentPlayer = this.#choosePlayer();
      this.#promptPlayer();
      this.#printUsage();
    }
  }

  startGame() {
    this.#board.render(console);
    this.#currentPlayer = this.#players[0];
    this.#promptPlayer();
    this.#printUsage();
  }

  consolidateMove(move) {
    const boxNumber = this.#getBoxNumber(move);
    this.#updateBoard(boxNumber);
    this.#changeCurrentPlayer();
  }

  printEndResult() {
    const result = this.#hasWinner ? `${this.#winner.name} won!!` : 'It is a draw!!';
    console.log(result);
  }
}

exports.Game = Game;