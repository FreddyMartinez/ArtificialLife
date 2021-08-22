class Particle {
  constructor() {
    this.maxSpeed = 2;
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0,0);
    this.aceleration = createVector(0,0);
  }

  update() {
    this.velocity.add(this.aceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.aceleration.mult(0);
  }

  show() {
    this.update();
    this.edges();
    stroke(0, 50);
    strokeWeight(2);
    point(this.position.x, this.position.y);
  }

  applyForce(force) {
    this.aceleration.add(force);
  }

  edges() {
    if(this.position.x > width) this.position.x = 0;
    if(this.position.x < 0) this.position.x = width;
    if(this.position.y > height) this.position.y = 0;
    if(this.position.y < 0) this.position.y = height;
  }
}