let offset = 0;

function setup() {
	createCanvas(600, 600);
}

function draw() {
	background(0);
  stroke(255);
  noFill();
  beginShape();
  for (let x = 0; x < width; x++) {
    const y = noise(x/100 + offset) * height;
    vertex(x, y);
  }
  endShape();

  offset += 0.01;
}
