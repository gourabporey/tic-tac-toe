class IO {
  constructor({ stdout, stdin }) {
    this.stdin = stdin;
    this.stdout = stdout;
  }

  readChar(onReadChar) {
    this.stdin.setEncoding('utf-8');
    this.stdin.setRawMode(true);
    this.stdin.on('data', onReadChar);
  }

  writeLine(message) {
    this.stdout.write(message + '\n');
  }

  clearScreen() {
    this.stdout.cursorTo(0, 0);
    this.stdout.clearScreenDown();
  }

  stop() {
    this.stdin.destroy();
  }
}

exports.IO = IO;