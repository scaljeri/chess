const {
  fenToState,
  stateToFen,
  squareInBoard,
  getSquareMoves,
  moveSquare
} = require("./board");
const { boardToAscii } = require("./ascii");

const FEN_START_POSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

class Chess {
  constructor(fenPosition) {
    this.state = fenToState(fenPosition || FEN_START_POSITION);
  }

  getSquare(algebraicPosition) {
    return squareInBoard({ board: this.state.board, algebraicPosition });
  }

  getMoves(algebraicPosition) {
    return getSquareMoves({
      state: this.state,
      algebraicPosition
    });
  }

  move(algebraicPositionFrom, algebraicPositionTo) {
    return moveSquare({
      state: this.state,
      algebraicPositionFrom,
      algebraicPositionTo
    });
  }

  toFen() {
    return stateToFen(this.state);
  }

  toAscii(showAlgebraic) {
    return boardToAscii(this.state.board, showAlgebraic);
  }
}

module.exports = { Chess };
