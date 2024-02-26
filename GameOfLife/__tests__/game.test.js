require("../src/index");
const { isAlive, generateEmptyBoard, countNeighbours, regenerateBoard } =
  window.game;

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
});
