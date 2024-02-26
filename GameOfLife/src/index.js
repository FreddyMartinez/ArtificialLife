const isAlive = (cell, neighbours) => {
  if (neighbours < 2 || neighbours > 3) {
    return 0;
  }
  if (neighbours === 3) {
    return 1;
  }
  return cell;
};

const generateEmptyBoard = (size) => new Array(size * size).fill(0);

const addCells = (...cells) =>
  cells.reduce((acc, curr) => acc + (curr || 0), 0);

const countNeighbours = (cells, index) => {
  const width = Math.sqrt(cells.length);
  const x = index % width;
  const lefttNeighbours =
    x > 0
      ? [cells[index - 1], cells[index - width - 1], cells[index + width - 1]]
      : [];
  const rightNeighbours =
    x < width - 1
      ? [cells[index + 1], cells[index - width + 1], cells[index + width + 1]]
      : [];
  return addCells(
    cells[index - width],
    cells[index + width],
    ...lefttNeighbours,
    ...rightNeighbours
  );
};

const regenerateBoard = (cells) =>
  cells.map((cell, index) => isAlive(cell, countNeighbours(cells, index)));

window.game = {
  isAlive,
  generateEmptyBoard,
  countNeighbours,
  regenerateBoard,
};
