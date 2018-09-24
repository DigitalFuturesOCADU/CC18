/*
Creation & Computation - Kate Hartman
Colors Clicks
*/

function setup() {
  // create a canvas the size of the display
  createCanvas(2000, 2000);
  
  // write instructions when sketch first opens
  textSize(80);
  text("TAP TO SELECT COLOR", 0,0,600, 400);

}

function draw() {
  //nothing happens here
}

function mousePressed() {
  background(random(0, 255), random(0, 255), random(0, 255));
}