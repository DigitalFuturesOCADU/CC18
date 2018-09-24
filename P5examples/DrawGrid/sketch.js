/*
Creation & Compuation - Kate Hartman
Draw Grid

move mouse along X & Y to change grid spacing
*/

var lineIncrementx;
var lineIncrementy;

function setup() {
  createCanvas(1000, 800);
  background(255);
  lineIncrementx = 10;
  lineIncrementy = 10;
}

function draw() {
  //redraw background
  background(255);

  //set mouse coordinates to control line increments
  //constrain so to prevent use of 0 or negative numbers
  lineIncrementx = constrain(mouseX, 1, width);
  lineIncrementy = constrain(mouseY, 1, width);

  //stroke attributes
  stroke(180);
  strokeWeight(2);

  //draw vertical lines
  for (var x = 0; x <= width; x += lineIncrementx) {
    line(x, 0, x, height);
  }

  //draw horizontal lines
  for (var y = 0; y <= height; y += lineIncrementy) {
    line(0, y, width, y);
  }

}