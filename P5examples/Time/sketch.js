/*
Creation & Compuation - Kate Hartman
Time

*/

var h;
var m;

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(255);
  fill(0);
  h = hour(); //Needs to be included inside a function, such as setup or draw.
  m = minute(); //Needs to be included inside a function, such as setup or draw.
  text("Current time: " + h + ":" + m, 5, 50);
  console.log(h);

}