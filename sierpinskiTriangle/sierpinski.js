/*
 * This is an extended version test of the Sierspinki triangle
 * Change dispersion or number of points to get different figures
 * Author: Freddy Martínez
 */

//dispersion must be a value between 0.5 and 1
var dispersion = 0.5;
//number of points must be greater than 2
var numberOfPoints = 3;

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

var Sierpinski = function (id) {
  this.canvas = document.getElementById(id) || document.getElementsByTagName("canvas")[0];
  this.x_size = this.canvas.width/2;
  this.y_size = this.canvas.height/2;
  this.centerPoint = new Point(this.canvas.width/2, this.canvas.height/2);
  this.points = [];

  for(let c=1; c<=numberOfPoints; c++){
    this.points.push(new Point(this.centerPoint.x + this.x_size * Math.sin(Math.PI * 2 *c / numberOfPoints), this.centerPoint.y + this.x_size * Math.cos(Math.PI * 2 * c / numberOfPoints)));
  }

  this.current_point = new Point(
    Math.floor((Math.random() * this.x_size)),
    Math.floor((Math.random() * this.y_size))
  );
  this.canvas = this.canvas.getContext("2d");
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
  var c = this.canvas;
  c.fillStyle = "#000000";
  c.beginPath();
  c.arc(point.x, point.y, 1, 0, Math.PI * 2, true);
  c.closePath();
  c.fill();
};

//set the values and begin the process
function begin(){
  var cant = document.getElementById("cantidadIteraciones").value;
  dispersion = document.getElementById("dispersion").value;
  numberOfPoints = document.getElementById("cantidadAristas").value;
  var triangle = new Sierpinski();
  for (var i = 0; i < cant; i++){
    triangle.draw();
  }
}