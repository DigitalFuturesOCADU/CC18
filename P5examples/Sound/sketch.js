/*
Creation & Computation - Kate Hartman
Sound Example
*/

var rooster;
var survive;


function preload() {
  rooster = loadSound("rooster.mp3");
  survive = loadSound("survive.mp3");
}

function setup() {
  rooster.play();
  createCanvas(400, 400);
}

function draw() {
  
  if(mouseX < 200){
    survive.play();
  }else{
    survive.pause();
  }

}

function mousePressed() {
  if (survive.isPlaying()) { // .isPlaying() returns a boolean
    survive.pause();
    background(255);
  } else {
    survive.play();
    background('#FF00FF');
  }
}