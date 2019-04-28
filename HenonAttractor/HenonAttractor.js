/*
 * This is the Henon Map with classical values, but, you can change that values as 'a' and 'b'
 * Author: Freddy Martínez
 */

var x0 = 0;
var y0 = 0;
var a = 1.4;
var b = 0.3;

var Henon = function () {
    this.canvas = document.getElementsByTagName("canvas")[0];
    this.canvas = this.canvas.getContext("2d");
};

var Point = function (x, y) {
    this.x = x;
    this.y = y;
};

Henon.prototype.calculate = function (x, y) {
    var x1 = 1 - a * x * x + y;
    var y1 = b * x;
    this.draw_point(x, y);
    return new Point(x1, y1);
}

Henon.prototype.iteration = function (cant) {
    var p = new Point(x0, y0);
    for (let i = 0; i < cant; i++) {
        p = this.calculate(p.x, p.y);
    }
}

//the point is multiplied and moved to the middle to plot it
Henon.prototype.draw_point = function (x, y) {
    var c = this.canvas;
    c.fillStyle = "#000000";
    c.beginPath();
    c.arc(x * 200 + 300, y * 200 + 300, 1, 0, Math.PI * 2, true); 
    c.closePath();
    c.fill();
};

function begin() {
    var cant = document.getElementById("iter").value;
    var attractor = new Henon();
    attractor.iteration(cant);
}
