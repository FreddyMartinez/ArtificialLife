class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let a = 1.4;
let b = 0.3;
var current = new Point(0, 0);

function calculateNew(p) {
  const x = 1 - a * p.x * p.x + p.y;
  const y = b * p.x;
  return new Point(x, y);
}

function setup() {
	createCanvas(windowWidth, 600);
	background(0);
}

function draw() {
  current = calculateNew(current);
	strokeWeight(2);
	stroke(255);
  point(current.x * 200 + windowWidth / 2, current.y * 200 + 300);
}
