class Board {
  #boxes;

  constructor({ height, width }) {
    this.#boxes = this.#generateBoxes({ height, width })
  }

  #generateBoxes({ height, width }) {
    return new Array(height * width).fill(' ');
  }

  put(point, glyph) {
    this.#boxes[point] = glyph;
  }

  contains(point) {
    return point in this.#boxes;
  }

  hasAvailableSpaceFor(point) {
    return this.#boxes[point] === ' ';
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

    renderer.table(board);
  }
}

exports.Board = Board;