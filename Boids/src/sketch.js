
const flock = [];
let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(1200, 600);
  alignSlider = createSlider(0, 1, 0.2, 0.05);
  cohesionSlider = createSlider(0, 2, 0.25, 0.05);
  separationSlider = createSlider(0, 4, 2, 0.1);
  for(let i = 0; i < 200; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  for (let boid of flock) {
    boid.show();
    boid.update();
    boid.flock(flock, alignSlider.value(), cohesionSlider.value(), separationSlider.value());
  }
}