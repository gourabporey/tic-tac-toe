class Player {
  #name;
  #icon;
  #moves;
  #status;

  constructor(name, icon) {
    this.#name = name;
    this.#icon = icon;
    this.#moves = [];
  }

  set status(result) {
    this.#status = result;
  }

  get name() {
    return this.#name;
  }

  get icon() {
    return this.#icon;
  }

  get status() {
    return this.#status;
  }

  get moves() {
    return [...(this.#moves)];
  }

  updateMoves(playerMove) {
    this.#moves.push(playerMove);
  }
}

exports.Player = Player;