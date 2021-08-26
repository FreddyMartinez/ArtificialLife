
let food = [];
let flock = [];
const predators = [];
let frames = 0;

function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  for(let i = 0; i < 100; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
  for(let i = 0; i < 5; i++){
    predators.push(new Predator(random(width), random(height)));
  }
}

function draw() {
  background(0);
  
  frames ++;
  if(frames % 50 == 0) {
    food.push(new Food());
    frames = 0;
  }

  for (let f of food) {
    f.show();
	}
  
  for (let boid of flock) {
    boid.flock(flock, predators, food);
    boid.show();
  }

  flock = flock.filter( boid => boid.isAlive);

  for(let pred of predators) {
    pred.show(flock);
  }
  if(floor(frameRate())<40)
  console.log(floor(frameRate()));
}