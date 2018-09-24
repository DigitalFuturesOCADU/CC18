/*
Creation & Computation - Kate Hartman
Line Example

*/

var linex1 = 0;
var liney1 = 50;
var linex2 = 300;
var liney2 = 50;

function setup() {
  createCanvas(1000, 700);
  liney1 = displayHeight/2;
  liney2 = windowHeight/2;
  
}

function draw() {
  strokeWeight(10);
  stroke(255, 0, 0);
  line(linex1, liney1, linex2, windowHeight/2);
}