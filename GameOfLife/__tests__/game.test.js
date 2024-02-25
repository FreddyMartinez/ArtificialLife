require('../src/index');
const { isAlive } = window.game;

describe('Game of life', () => {
  describe('isAlive algorithm', () => {
    it('should return 0 if cell is alive but there is less than 2 neighbours alive', () => {
      expect(isAlive(0, 0)).toBe(0);
      expect(isAlive(0, 1)).toBe(0);
    });

    it('should return 1 if cell is alive and 2 or 3 neighbour are alive', () => {
      expect(isAlive(1, 2)).toBe(1);
      expect(isAlive(1, 3)).toBe(1);
    });

    it('should return 0 if cell is alive but more than 3 neighbour are alive', () => {
      expect(isAlive(1, 4)).toBe(0);
    });

    it('should return 1 if cell is dead but 3 neighbour are alive', () => {
      expect(isAlive(0, 3)).toBe(1);
    });
  });
});

