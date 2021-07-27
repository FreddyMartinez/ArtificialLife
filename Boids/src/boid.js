class Boid {
	maxSpeed = 4;
	perception = 100;
	maxCohesion = 0.25;
	maxSteering = 0.1;
	maxSeparation = 0.1;

	constructor(x, y) {
		this.position = createVector(x, y);
		this.velocity = p5.Vector.random2D();
		this.acceleration = createVector();
	}

	show() {
		strokeWeight(2);
		stroke(255);
    const direction = createVector(this.velocity.x, this.velocity.y);
    direction.setMag(10);
    const ortogonal = createVector(this.velocity.y, this.velocity.x);
    ortogonal.setMag(5);
    triangle(
			this.position.x + direction.x,
			this.position.y + direction.y,
			this.position.x + ortogonal.x,
			this.position.y - ortogonal.y,
			this.position.x - ortogonal.x,
			this.position.y + ortogonal.y
		);
	}

	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.setMag(this.maxSpeed);
		this.acceleration.mult(0);
		this.edges();
	}

	flock(flock, maxAlignment, maxCohesion, maxSeparation) {
    this.maxSteering = maxAlignment;
    this.maxCohesion = maxCohesion;
    this.maxSeparation = maxSeparation;
		const neighbours = [];
		for (let neighbor of flock) {
			let distance = this.position.dist(neighbor.position);
			if (neighbor != this && distance < this.perception) {
				neighbours.push(neighbor);
			}
		}
		const alignment = this.alignment(neighbours);
		const cohesion = this.cohesion(neighbours);
		const separation = this.separation(neighbours);
		this.acceleration.add(alignment).add(cohesion).add(separation);
	}

	alignment(neighbours) {
		const avgVelocity = createVector(0, 0);
		for (let neighbor of neighbours) {
			avgVelocity.add(neighbor.velocity);
		}
		if (neighbours.length > 0) {
			avgVelocity
				.div(neighbours.length)
				.sub(this.velocity)
				.limit(this.maxSteering);
		}
		return avgVelocity;
	}

	cohesion(neighbours) {
		const avgPosition = createVector(0, 0);
		for (let neighbor of neighbours) {
			avgPosition.add(neighbor.position);
		}
		if (neighbours.length > 0) {
			avgPosition.div(neighbours.length);
			avgPosition.sub(this.position).limit(this.maxCohesion);
		}
		return avgPosition;
	}

	separation(neighbours) {
		const avgSeparation = createVector(0, 0);
		for (let neighbor of neighbours) {
      const distance = this.position.dist(neighbor.position);
      const singleSeparation = p5.Vector.sub(this.position, neighbor.position);
      singleSeparation.div(Math.pow(distance, 2));
			avgSeparation.add(singleSeparation);
		}
		if (neighbours.length > 0) {
			avgSeparation
				.div(neighbours.length)
        .setMag(this.maxSpeed)
				.sub(this.velocity)
				.limit(this.maxSeparation);
		}
		return avgSeparation;
  }

	edges() {
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		} else if (this.position.y < 0) {
			this.position.y = height;
		} else if (this.position.y > height) {
			this.position.y = 0;
		}
	}
}