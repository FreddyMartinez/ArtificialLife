class Boid {
	maxSpeed = 4;
  maxForce = 0.5;
	perception = 100;
	maxCohesion = 0.3;
	maxSteering = 0.3;
	maxSeparation = 0.3;
  isAlive = true;

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
		this.velocity.add(this.acceleration).setMag(this.maxSpeed);
		this.acceleration.mult(0);
	}

	flock(flock, maxAlignment, maxCohesion, maxSeparation, obstacles) {
    this.maxSteering = maxAlignment;
    this.maxCohesion = maxCohesion;
    this.maxSeparation = maxSeparation;
		const neighbours = [];
		for (let neighbor of flock) {
			const distance = this.position.dist(neighbor.position);
			if (neighbor != this && distance < this.perception) {
				neighbours.push(neighbor);
			}
		}
		const flockForce = this.flockInducedForce(neighbours);
    const edges = this.avoidEdges();
    const obstaclesAvoidance = this.avoidObstacles(obstacles);
		this.acceleration
			.add(flockForce)
			.add(edges)
      .add(obstaclesAvoidance)
			.limit(this.maxForce);
	}

  // Calculates alignment, cohesion and separation
	flockInducedForce(neighbours) {
		const avgVelocity = createVector(0, 0);
		const avgPosition = createVector(0, 0);
		const avgSeparation = createVector(0, 0);
		for (let neighbor of neighbours) {
			avgVelocity.add(neighbor.velocity);
			avgPosition.add(neighbor.position);
      const distance = this.position.dist(neighbor.position);
      const singleSeparation = p5.Vector.sub(this.position, neighbor.position);
      singleSeparation.div(Math.pow(distance, 2));
			avgSeparation.add(singleSeparation);
		}
		if (neighbours.length > 0) {
      // alignment force is the diference between the desired and current velocity
			avgVelocity.div(neighbours.length).sub(this.velocity).limit(this.maxSteering);
      // cohesion force is the diference between the desired position (center of the flock) and the current
			avgPosition.div(neighbours.length).sub(this.position).limit(this.maxCohesion);
      // separation force is the inverse of the distance to the neighbours 
      avgSeparation.div(neighbours.length).setMag(this.maxSeparation);
		}
		return avgVelocity.add(avgPosition).add(avgSeparation);
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
		} else if (this.position.y < this.perception) {
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

  avoidObstacles(obstacles) {
    const avoidObstacles = createVector(0, 0);
    let obstaclesNumber = 0;
    for (let obstacle of obstacles) {
			const distance = this.position.dist(obstacle.position);
			if (distance < this.perception) {
        if(distance < obstacle.radius) {
          this.isAlive = false;
        }
				const singleSeparation = p5.Vector.sub(this.position, obstacle.position);
        singleSeparation.div(Math.pow(distance, 2));
        avoidObstacles.add(singleSeparation);
        obstaclesNumber ++;
			}
		}
    if (obstaclesNumber > 0) {
			avoidObstacles
				.div(obstaclesNumber)
        .setMag(this.maxSpeed)
				.sub(this.velocity);
		}
		return avoidObstacles;
  }

}