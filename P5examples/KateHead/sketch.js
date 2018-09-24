/*
Creation & Computation - Kate Hartman
Kate head new
Fall 2017
*/


function preload() {
  img = loadImage("assets/katehead.jpg");
}

function setup() {
  // create a canvas the size of the display
  createCanvas(2000, 2000);
  ellipse(50,50,50,50);
  
  // write instructions when sketch first opens
  textSize(80);
  text("TAP TO SELECT COLOR", 0,0,600, 400);

}

function draw() {
  //nothing happens here
  image(img, mouseX, mouseY);
}

