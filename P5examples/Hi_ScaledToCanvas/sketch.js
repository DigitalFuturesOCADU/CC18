/*
Creation & Computation - Kate Hartman
Hi - Scaled to Canvas

Try changing the Canvas size and see what happens
*/

var margin = 75;
  
  function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  stroke(50);
  line(width/4, margin, width/4, height-margin);
  line(width/4*2, margin, width/4*2, height-margin);
  line(width/4*3, margin, width/4*3, height-margin);
  line(width/4, height/2, width/4*2, height/2);
}