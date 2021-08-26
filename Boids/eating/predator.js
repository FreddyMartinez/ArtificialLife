class Predator {
  radius = 20;
  maxSpeed = 2;
  maxForce = 0.5;
	perception = 100;
  isAlive = true;

  constructor(x, y) {
		this.position = createVector(x, y);
		this.velocity = p5.Vector.random2D().limit(this.maxSpeed);
		this.acceleration = createVector();
	}

	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration).setMag(this.maxSpeed);
		this.acceleration.mult(0);
	}

  show(flock) {
    const chase = this.chasePrey(flock);
    const edges = this.avoidEdges();
    this.acceleration.add(edges).add(chase).limit(this.maxForce);

    this.update();
    strokeWeight(2);
    fill(100, 100, 255)
    circle(this.position.x, this.position.y, this.radius * 2);
  }

  chasePrey(flock) {
    // look for the nearest prey
    let distance = this.perception;
    let choosenPrey;
    for(let prey of flock) {
      const preyDistance = this.position.dist(prey.position);
      if(preyDistance < distance) {
        distance = preyDistance;
        choosenPrey = prey;
      }
    }

    let chaseAceleration = createVector(0, 0);
    if(choosenPrey) {
      // calculate nex position
      const nextPosition = p5.Vector.add(choosenPrey.position, choosenPrey.velocity);
      // chase
      chaseAceleration = nextPosition.sub(this.position);
    }
    return chaseAceleration;
  }

  avoidEdges() {
    const avoidEdge = createVector(0, 0);
		if (this.position.x > width - this.perception) {
      if (this.position.x >= width) {
        this.position.x = width - 1;
      }
			avoidEdge.x -= 200 / (width - this.position.x);
		} else if (this.position.x < this.perception) {
      if (this.position.x <= 0) {
        this.position.x = 1;
      }
			avoidEdge.x += 200 / this.position.x;
		} 
    if (this.position.y < this.perception) {
      if (this.position.y <= 0) {
        this.position.y = 1;
      }
			avoidEdge.y += 200 / this.position.y;
		} else if (this.position.y > height - this.perception) {
      if (this.position.y >= height) {
        this.position.y = height - 1;
      }
      avoidEdge.y -= 200 / (height - this.position.y);
		}
    return avoidEdge;
	}
}