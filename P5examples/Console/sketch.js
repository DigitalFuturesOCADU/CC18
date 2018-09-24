/*
Creation & Compuation - Kate Hartman
Console
Fall 2016
*/

function setup() {
  createCanvas(1000, 800);
  textSize(40);
  text("In Chrome, go to View -> Developer -> Javascript Console", 10, 10);
}

function draw() {
  background(255);
  fill(0);
  textSize(30);
  text("In Chrome, go to View -> Developer -> Javascript Console", 50, 50);
  noStroke();
  fill('#FF00FF');
  ellipse(mouseX,mouseY,20,20);
  console.log("Mouse X: " + mouseX + ", Mouse Y: " + mouseY);
}