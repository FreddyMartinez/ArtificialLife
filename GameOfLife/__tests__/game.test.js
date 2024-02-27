require("../src/index");
const {
  isAlive,
  generateEmptyBoard,
  countNeighbours,
  regenerateBoard,
  drawBoard,
  attachGridEventHandler,
  readCellsFromDOM,
  start,
  stop,
} = window.game;

describe("Game of life", () => {
  describe("isAlive algorithm", () => {
    it("should return 0 if cell is alive but there is less than 2 neighbours alive", () => {
      expect(isAlive(0, 0)).toBe(0);
      expect(isAlive(0, 1)).toBe(0);
    });

    it("should return 1 if cell is alive and 2 or 3 neighbour are alive", () => {
      expect(isAlive(1, 2)).toBe(1);
      expect(isAlive(1, 3)).toBe(1);
    });

    it("should return 0 if cell is alive but more than 3 neighbour are alive", () => {
      expect(isAlive(1, 4)).toBe(0);
    });

    it("should return 1 if cell is dead but 3 neighbour are alive", () => {
      expect(isAlive(0, 3)).toBe(1);
    });
  });

  describe("generateEmptyBoard function", () => {
    it("should create an array of x*x", () => {
      expect(generateEmptyBoard(1)).toEqual([0]);
      expect(generateEmptyBoard(3)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe("countNeighbours function", () => {
    it("should return the number of alive neighbours for small grids", () => {
      const cells = generateEmptyBoard(2);
      expect(countNeighbours(cells, 0)).toBe(0);
      cells[0] = 1;
      expect(countNeighbours(cells, 0)).toBe(0);
      cells[1] = 1;
      expect(countNeighbours(cells, 0)).toBe(1);
      cells[2] = 1;
      expect(countNeighbours(cells, 0)).toBe(2);
      cells[0] = 0;
      expect(countNeighbours(cells, 0)).toBe(2);
    });

    it("should return the number of alive neighbours for big grids", () => {
      const cells = generateEmptyBoard(5);
      expect(countNeighbours(cells, 0)).toBe(0);
      cells[0] = 1;
      expect(countNeighbours(cells, 0)).toBe(0);
      cells[1] = 1;
      expect(countNeighbours(cells, 0)).toBe(1);
      cells[5] = 1;
      expect(countNeighbours(cells, 0)).toBe(2);
      cells[0] = 0;
      expect(countNeighbours(cells, 0)).toBe(2);
    });
  });

  describe("regenerateBoard function", () => {
    it("should not update dead cells", () => {
      const cells = generateEmptyBoard(1);
      expect(regenerateBoard(cells)).toEqual([0]);
    });

    it("should return all as dead when no enough neighbours", () => {
      const cells = generateEmptyBoard(2);
      cells[0] = 1;
      expect(regenerateBoard(cells)).toEqual([0, 0, 0, 0]);
    });
  });

  describe("Browser grid", () => {
    it("should display the grid cells", () => {
      document.body.innerHTML = `<div id="grid"></div>`;
      drawBoard([1, 0, 0, 0]);
      expect(document.getElementById("grid")).not.toBeNull();
      expect(document.querySelectorAll(".row").length).toBe(2);
      expect(document.querySelectorAll(".cell").length).toBe(4);
      expect(document.querySelectorAll(".dead").length).toBe(3);
      expect(document.querySelectorAll(".alive").length).toBe(1);

      drawBoard([0, 0, 1, 1]);
      expect(document.querySelectorAll(".dead").length).toBe(2);
      expect(document.querySelectorAll(".alive").length).toBe(2);
    });
  });

  describe("Event handler for grid", () => {
    it("should toggle cell state live/dead when clicked", () => {
      document.body.innerHTML = `<div id="grid"></div>`;
      drawBoard([0]);
      attachGridEventHandler();
      const cells = document.querySelectorAll(".cell");
      expect(cells.length).toBe(1);
      expect(document.querySelectorAll(".dead").length).toBe(1);
      expect(document.querySelectorAll(".alive").length).toBe(0);
      document.querySelector(".dead").click();
      expect(document.querySelectorAll(".dead").length).toBe(0);
      expect(document.querySelectorAll(".alive").length).toBe(1);
      document.querySelector(".alive").click();
      expect(document.querySelectorAll(".dead").length).toBe(1);
      expect(document.querySelectorAll(".alive").length).toBe(0);
    });
  });

  describe("Read cells from dom", () => {
    it("should return an array of cells from DOM", () => {
      document.body.innerHTML = `<div id="grid"></div>`;
      const cells = [0, 1, 0, 1]
      drawBoard(cells);
      expect(readCellsFromDOM()).toEqual(cells);
    });
  });

  describe("Game start", () => {
    it("should start the game", () => {
      jest.useFakeTimers({ legacyFakeTimers: true });
      const readCellsSpy = jest.spyOn(game, "readCellsFromDOM");
      const regenerateSpy = jest.spyOn(game, "regenerateBoard");
      const drawBoardSpy = jest.spyOn(game, "regenerateBoard");
      start();
      jest.runOnlyPendingTimers();
      expect(setInterval).toHaveBeenCalled();
      expect(readCellsSpy).toHaveBeenCalled();
      expect(regenerateSpy).toHaveBeenCalled();
      expect(drawBoardSpy).toHaveBeenCalled();
      expect(start).not.toThrow();
    });
  });

  describe("Stop function", () => {
    it("should clear interval", () => {
      jest.useFakeTimers({ legacyFakeTimers: true });
      stop();
      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
