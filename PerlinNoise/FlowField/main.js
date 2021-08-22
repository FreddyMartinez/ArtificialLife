let offset = 0;
let scale = 20;
let cols, rows;
const particles = new Array(1000);
let flowField = [];
let update = true;

function setup() {
	createCanvas(800, 800);
  background(255);
  cols = floor(width / scale);
  rows = floor(height / scale);

  flowField = new Array(cols * rows);
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
}

function draw() {

  if(update) {
    updateField();
  } else {
    offset += 0.01;
  }
  update = !update

  for (let p of particles) {
    const index = floor(p.position.x / scale) + floor(p.position.y / scale) * cols;
    const force = flowField[index];
    p.applyForce(force);
    p.show();
  }
}

function updateField() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const angle = noise(x/10, y/10, offset) * TWO_PI;
      const v = p5.Vector.fromAngle(angle);
      
      const index = x + y * cols;
      flowField[index] = v;
    }
  }
}