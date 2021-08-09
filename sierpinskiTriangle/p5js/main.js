class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance(refPoint) {
    return new Point(
      this.x - refPoint.x,
      this.y - refPoint.y
    );
  };
}

class Sierpinski {
  constructor(numberOfPoints = 3) {
    this.centerPoint = new Point(width / 2, height / 2);
    this.points = [];
    
    for (let c = 1; c <= numberOfPoints; c++) {
			this.points.push(
				new Point(
					this.centerPoint.x +
            (height / 2) * Math.sin((Math.PI * 2 * c) / numberOfPoints),
          this.centerPoint.y -
						(height / 2) * Math.cos((Math.PI * 2 * c) / numberOfPoints)
				)
			);
		}
  }

  randomVertex () {
    return this.points[Math.floor(Math.random()*this.points.length)]; 
  }
};

var current;
let stopButton, resetButton;
let sierpinski;
let dispersion = 0.5;
let verticesSlider, dispersionSlider;

function calculateNew(current) {
  const vertex = sierpinski.randomVertex();
  const distance = current.distance(vertex);
  return new Point(
    current.x - (distance.x * dispersion),
    current.y - (distance.y * dispersion)
  );
}

const init = () => {
  background(0);
  sierpinski = new Sierpinski(verticesSlider.value());
  dispersion = dispersionSlider.value();

  for(let p of sierpinski.points) {
    strokeWeight(5);
	  stroke(255);
    point(p.x, p.y);
  }

  loop();
}  

function setup() {
	createCanvas(windowWidth -100, windowHeight - 100);
  current = new Point(random(width), random(height));
  verticesSlider = createSlider(3, 10, 3, 1);
  dispersionSlider = createSlider(0, 1, 0.5, 0.05);
  init();
  
  stopButton = createButton('Stop');
  stopButton.style('margin', '10px');
  stopButton.mousePressed(noLoop);
  resetButton = createButton('Reset');
  resetButton.mousePressed(init);
}

function draw() {
  for(let i = 0; i < 10; i++) {
    current = calculateNew(current);
    strokeWeight(2);
    stroke(255);
    point(current.x, current.y);
  }
}
