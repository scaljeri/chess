import { unique } from "./utils";

const PIECE_COLOR = {
  WHITE: "w",
  BLACK: "b"
};

const PIECE_TYPE = {
  PAWN: "p",
  KNIGHT: "n",
  BISHOP: "b",
  ROOK: "r",
  QUEEN: "q",
  KING: "k"
};

const PIECE_OFFSETS_CROSS = offsetCombinations([0, 1]);
const PIECE_OFFSETS_DIAGONAL = offsetCombinations([1, 1]);
const PIECE_OFFSETS_KNIGHT = offsetCombinations([1, 2]);

const PAWN_PROMOTION = {
  w: 8,
  b: 1
};

const PAWN_START = {
  w: 2,
  b: 7
};

const PAWN_OFFSETS = {
  w: [[1, 0], [1, -1], [1, 1]],
  b: [[-1, 0], [-1, -1], [-1, 1]]
};

const PIECE_OFFSETS = {
  n: PIECE_OFFSETS_KNIGHT,
  b: PIECE_OFFSETS_DIAGONAL,
  r: PIECE_OFFSETS_CROSS,
  q: [...PIECE_OFFSETS_CROSS, ...PIECE_OFFSETS_DIAGONAL],
  k: [...PIECE_OFFSETS_CROSS, ...PIECE_OFFSETS_DIAGONAL]
};

const PIECE_OFFSETS_NUM_MOVES = {
  n: 1,
  b: -1,
  r: -1,
  q: -1,
  k: 1
};

const CASTLING_TYPE = {
  KING: "k",
  QUEEN: "q"
};

const CASTLING = {
  k: { king: { from: "e", to: "g" }, rook: { from: "h", to: "f" } },
  q: { king: { from: "e", to: "c" }, rook: { from: "a", to: "d" } }
};

const CASTLING_SAFE = {
  k: ["e", "f", "g"],
  q: ["b", "c", "d", "e"]
};

function offsetCombinations(offset) {
  const reverseRow = [offset[0] * -1, offset[1]];
  const reverseCol = [offset[0], offset[1] * -1];
  const reverseRowCol = [offset[0] * -1, offset[1] * -1];
  const reverseInverse = [offset, reverseRow, reverseCol, reverseRowCol].map(
    offsetCombination => [offsetCombination[1], offsetCombination[0]]
  );
  return unique([
    offset,
    reverseRow,
    reverseCol,
    reverseRowCol,
    ...reverseInverse
  ]);
}

function isPawn(piece) {
  return piece && piece.type === PIECE_TYPE.PAWN;
}

function inverseColor(rightColor) {
  const rightIndexColor = Object.values(PIECE_COLOR)
    .map((color, index) => ({ color: color, index: index }))
    .find(object => object.color === rightColor).index;
  const sizeColors = Object.values(PIECE_COLOR).length;
  const inverseIndexColor = (rightIndexColor + 1) % sizeColors;
  return Object.values(PIECE_COLOR).find(
    (_, index) => index === inverseIndexColor
  );
}

export {
  PIECE_COLOR,
  PIECE_TYPE,
  PIECE_OFFSETS,
  PIECE_OFFSETS_NUM_MOVES,
  PAWN_OFFSETS,
  PAWN_PROMOTION,
  PAWN_START,
  CASTLING,
  CASTLING_TYPE,
  CASTLING_SAFE,
  isPawn,
  inverseColor
};
