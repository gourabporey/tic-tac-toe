const { Board } = require("./src/board");
const { Game } = require("./src/game");
const { GameController } = require("./src/game-controller");
const { Player } = require("./src/player");

const main = () => {
  const controller = new GameController(process);
  const playerNames = process.argv.slice(2);
  const player1 = new Player(playerNames[0], 'O');
  const player2 = new Player(playerNames[1], 'X');
  const players = [player1, player2];
  const board = new Board({ height: 3, width: 3 });
  const game = new Game(players, board, controller);
  game.start();
}

main();