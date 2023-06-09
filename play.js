const { Board } = require("./src/board");
const { Game } = require("./src/game");
const { GameController } = require("./src/game-controller");
const { Player } = require("./src/player");

const main = () => {
  const controller = new GameController(process);
  const player1 = new Player('gourab', 'G');
  const player2 = new Player('Sourov', 'S');
  const players = [player1, player2];
  const board = new Board({ height: 3, width: 3 });
  const game = new Game(players, board, controller);
  game.start();
}

main();