class Obstacle {
  radius = 20;
  constructor(x, y) {
		this.position = createVector(x, y);
	}

  show() {
    strokeWeight(2);
    fill(255, 255, 0)
    circle(this.position.x, this.position.y, this.radius * 2);
  }

}