class Food {
  constructor() {
		this.position = createVector(random(width), random(height));
  }

  show() {
    noStroke(2);
    fill(0, 255, 0)
    circle(this.position.x, this.position.y, 5);
  }
}