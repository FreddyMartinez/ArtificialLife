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

const createElement = (className) => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

const drawBoard = (cells) => {
  const width = Math.sqrt(cells.length);
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  let row;
  cells.forEach((cell, index) => {
    if (index % width === 0) {
      row = createElement("row");
      grid.appendChild(row);
    }

    const cellDiv = createElement(`cell ${!!cell ? "alive" : "dead"}`);
    row.appendChild(cellDiv);
  });

};

const attachGridEventHandler = () => {
  document.getElementById("grid").addEventListener("click", (event) => {
    const classList = event.target.classList;
    classList.toggle("dead");
    classList.toggle("alive");
  });
}

window.game = {
  isAlive,
  generateEmptyBoard,
  countNeighbours,
  regenerateBoard,
  drawBoard,
  attachGridEventHandler,
};
