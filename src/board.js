class Board {
  #boxes;
  #formatter;

  constructor({ height, width }, tableFormatter) {
    this.#boxes = this.#generateBoxes({ height, width });
    this.#formatter = tableFormatter;
  }

  #generateBoxes({ height, width }) {
    return new Array(height * width).fill(' ');
  }

  put(point, glyph) {
    this.#boxes[point] = glyph;
  }

  #contains(point) {
    return point in this.#boxes;
  }

  canPlaceMove(point) {
    return this.#contains(point) && this.#boxes[point] === ' ';
  }

  render(renderer) {
    const board = [];

    this.#boxes.forEach((box, index) => {
      if (index % 3 !== 0) {
        board[board.length - 1].push(box);
        return;
      }

      board.push([box]);
    });

    renderer.clearScreen();
    renderer.writeLine(this.#formatter(board));
  }
}

exports.Board = Board;