const { Board } = require("./src/board");
const { Game } = require("./src/game");
const { GameController } = require("./src/game-controller");
const { IO } = require("./src/io");
const { Player } = require("./src/player");
const { table } = require('table');

const main = () => {
  const SYMBOLS = ['O', 'X'];
  const playerNames = process.argv.slice(2)

  const players = playerNames.map((playerName, index) => new Player(playerName, SYMBOLS[index]));
  const board = new Board({ height: 3, width: 3 }, table);
  const game = new Game(players, board);

  const { stdout, stdin } = process;
  const io = new IO({ stdin, stdout });
  const gameController = new GameController(io, game);
  gameController.start();
}

main();