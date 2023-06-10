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
  #writer;

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

  #requestInput(player) {
    this.#writer.writeLine(`${player.name}'s turn [${player.icon}]\n`);
  }

  #printUsage() {
    this.#writer.writeLine(`Moves are [1 to 9]: Enter 'q' to quit\n`);
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

    this.#board.render(this.#writer);

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
    this.#board.render(this.#writer);
    const currentPlayer = this.#choosePlayer();
    this.#requestInput(currentPlayer);
    this.#printUsage();
  }

  startGame(writer) {
    this.#writer = writer;
    this.#showTurn();
  }

  consolidateMove(move) {
    const boxNumber = this.#getBoxNumber(move);
    this.#updateBoard(boxNumber);
    this.#changeCurrentPlayer();
  }

  printEndResult() {
    const result = this.#winner ? `${this.#winner.name} won!!\n` : 'It is a draw!!\n';
    this.#writer.writeLine(result);
  }
}

exports.Game = Game;