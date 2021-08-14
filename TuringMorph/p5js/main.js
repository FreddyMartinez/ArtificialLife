/**
 * Reaction-diffusion simulation
 * Using this guide http://www.karlsims.com/rd.html
 */

let currentGrid;
let nextGrid;
const Da = 1;
const Db = 0.5;
const f = 0.055;
const k = 0.062;

cols = 200;
rows = 200;

function setup() {
	createCanvas(cols, rows);
	background(0);
  currentGrid = [];
  nextGrid = [];
  for (let i = 0; i < cols; i++) {
    currentGrid[i] = [];
    nextGrid[i] = [];
		for (let j = 0; j < rows; j++) {
      currentGrid[i][j] = {a: 1, b: 0};
      nextGrid[i][j] = {a: 1, b: 0};
    }
	}

  for (let i = 40; i < 60; i++) {
		for (let j = 40; j < 60; j++) {
      currentGrid[i][j].b = 1
    }
	}  
}

function draw() {
  for (let i = 1; i < cols-1; i++) {
		for (let j = 1; j < rows-1; j++) {
      const a = currentGrid[i][j].a;
      const b = currentGrid[i][j].b;
      nextGrid[i][j].a =
				a + Da * laplacian(i, j, "a") - a * b * b + f * (1 - a);
      nextGrid[i][j].b =
				b + Db * laplacian(i, j, "b") + a * b * b - (k + f) * b;
    }
	}

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const c = Math.floor((nextGrid[x][y].a - nextGrid[x][y].b) * 255);
      const pcolor = color(c , c, c); 
      set(x,y,pcolor); 
    }
  }
  updatePixels();
  // current takes the new values
  currentGrid = JSON.parse(JSON.stringify(nextGrid));
}

function laplacian(x, y, chemical) {
  const convolution =
		-1 * currentGrid[x][y][chemical] +
		0.2 * currentGrid[x][y - 1][chemical] +
		0.2 * currentGrid[x][y + 1][chemical] +
		0.2 * currentGrid[x - 1][y][chemical] +
		0.2 * currentGrid[x + 1][y][chemical] +
		0.05 * currentGrid[x + 1][y + 1][chemical] +
		0.05 * currentGrid[x + 1][y - 1][chemical] +
		0.05 * currentGrid[x - 1][y - 1][chemical] +
		0.05 * currentGrid[x - 1][y + 1][chemical];
  return convolution;
}