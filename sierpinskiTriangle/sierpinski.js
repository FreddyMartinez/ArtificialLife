/*
 * This is an extended version test of the Sierspinki triangle
 * Change dispersion or number of points to get different figures
 * Author: Freddy Martínez
 */

//dispersion must be a value between 0.5 and 1
var dispersion;
//number of points must be greater than 2
var numberOfPoints;

var Point = function (x, y) {
  this.x = x;
  this.y = y;
};

//this function return the distance in x and y from the current point to one vertice
Point.prototype.distance = function (basePoint) {
  return new Point(
    this.x - basePoint.x,
    this.y - basePoint.y
  );
};
//this function 
Point.prototype.halfway = function (base) {
  var distance = this.distance(base);
  return new Point(
    this.x - (distance.x * dispersion),
    this.y - (distance.y * dispersion)
  );
};

var Sierpinski = function () {
  this.canvas = document.getElementsByTagName("canvas")[0];
  this.context = this.canvas.getContext("2d");
  this.x_size = this.canvas.width/2;
  this.y_size = this.canvas.height/2;
  this.centerPoint = new Point(this.x_size, this.y_size);
  this.points = [];
  this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

  for(let c=1; c<=numberOfPoints; c++){
    this.points.push(
      new Point(
        this.x_size +
          this.x_size * Math.sin((Math.PI * 2 * c) / numberOfPoints),
        this.y_size - this.x_size * Math.cos((Math.PI * 2 * c) / numberOfPoints)
      )
    );
  }

  this.current_point = new Point(
    Math.floor((Math.random() * this.x_size)),
    Math.floor((Math.random() * this.y_size))
  );
};

//this function choose a vertex randomly
Array.prototype.random = function() { 
  return this[Math.floor(Math.random()*this.length)]; 
};

//here we get the new point and refresh position
Sierpinski.prototype.draw = function () {
  var midpoint = this.current_point.halfway(this.points.random());
  this.draw_point(midpoint);
  this.current_point = midpoint;
};

//here we draw the point
Sierpinski.prototype.draw_point = function (point) {
  this.context.fillStyle = "#000000";
  this.context.beginPath();
  this.context.arc(point.x, point.y, 1, 0, Math.PI * 2, true);
  this.context.fill();
  this.context.closePath();
};

//set the values and begin the process
function begin(){
  var iterations = document.getElementById("cantidadIteraciones").value;
  dispersion = document.getElementById("dispersion").value || 0.5;
  numberOfPoints = document.getElementById("cantidadAristas").value || 3;
  var triangle = new Sierpinski();
  for (var i = 0; i < iterations; i++){
    triangle.draw();
  }
}