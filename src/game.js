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
  #gameOver;
  #hasWinner;
  #controller;
  #winner;

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
    })
  }

  start() {
    const inputStream = this.#controller.start();
    const PLAYERS_COUNT = 2;
    const board = this.#board;
    board.render(console);

    inputStream.on('data', (move) => {
      const currentPlayer = this.#players[this.#totalMoves % PLAYERS_COUNT];
      console.log(`${currentPlayer.name}'s turn`);

      if (board.contains(move) && board.hasAvailableSpaceFor(move)) {
        currentPlayer.updateMoves(+move);
        board.put(move, currentPlayer.icon);

        if (this.#hasWon(currentPlayer)) {
          this.#gameOver = true;
          this.#hasWinner = true;
          this.#winner = currentPlayer;
        }

        this.#totalMoves++;
      }

      board.render(console);

      if (this.#totalMoves === 9) {
        this.#gameOver = true;
      }

      if (this.#gameOver) {
        inputStream.destroy();
        if (this.#hasWinner) {
          console.log(this.#winner.name, 'won');
        } else {
          console.log('It is a draw');
        }
      }
    });
  }
}

exports.Game = Game;