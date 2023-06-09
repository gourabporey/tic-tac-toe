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
  #winner;

  constructor(players, board) {
    this.#players = players;
    this.#board = board;
    this.#totalMoves = 0;
    this.#isOver = false;
    this.#winner = null;
  }

  get isOver() {
    return this.#isOver;
  }

  #hasWon(player) {
    return WINNING_SEQUENCES.some(sequence => {
      return sequence.every(element => player.moves.includes(element));
    });
  }

  #promptPlayer(player) {
    console.log(`${player.name}'s turn [${player.icon}]`);
  }

  #printUsage() {
    console.log(`Moves are [1 to 9]: Enter 'q' to quit`);
  }

  #getBoxNumber(move) {
    return +move - 1;
  }

  #choosePlayer() {
    return this.#players[this.#totalMoves % this.#players.length];
  }

  #updateBoard(boxNumber) {
    const currentPlayer = this.#choosePlayer();

    if (this.#board.canPlaceMove(boxNumber)) {
      this.#board.put(boxNumber, currentPlayer.icon);
      currentPlayer.updateMoves(boxNumber);
      this.#totalMoves++;
    }

    this.#board.render(console);

    if (this.#hasWon(currentPlayer)) {
      this.#isOver = true;
      this.#winner = currentPlayer;
    }

    if (this.#totalMoves === 9) {
      this.#isOver = true;
    }
  }

  #changeCurrentPlayer() {
    if (!this.#isOver) {
      this.#showTurn();
    }
  }

  #showTurn() {
    this.#board.render(console);
    const currentPlayer = this.#choosePlayer();
    this.#promptPlayer(currentPlayer);
    this.#printUsage();
  }

  startGame() {
    this.#showTurn();
  }

  consolidateMove(move) {
    const boxNumber = this.#getBoxNumber(move);
    this.#updateBoard(boxNumber);
    this.#changeCurrentPlayer();
  }

  printEndResult() {
    const result = this.#winner ? `${this.#winner.name} won!!` : 'It is a draw!!';
    console.log(result);
  }
}

exports.Game = Game;