
let flock = [];
const obstacles = [];
let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(windowWidth, windowHeight - 100);
  alignSlider = createSlider(0, 1, 0.3, 0.05);
  cohesionSlider = createSlider(0, 1, 0.3, 0.05);
  separationSlider = createSlider(0, 1, 0.5, 0.05);
  for(let i = 0; i < 100; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
  for(let i = 0; i < 5; i++){
    obstacles.push(new Obstacle(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  for (let boid of flock) {
    boid.flock(flock, alignSlider.value(), cohesionSlider.value(), separationSlider.value(), obstacles);
    boid.update();
    boid.show();
  }

  flock = flock.filter( boid => boid.isAlive);

  for(let obs of obstacles) {
    obs.show();
  }
}