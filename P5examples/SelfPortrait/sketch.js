/*
Creation & Compuation - Kate Hartman
Self Portrait
Fall 2016
*/

var eyeSpacing;
var eyeWidth;
var eyeHeight;

function setup() {
  createCanvas(400,600);
  background('#FF00FF');
  eyeSpacing = 60;
  eyeWidth = 50;
  eyeHeight = 10;
}

function draw() {
  ellipseMode('CENTER');
  noStroke();
  
  //draw face
  fill(200);
  ellipse(width/2, height/3, 200, 300);
  
  //draw eyes
  fill(255);
  eyeSpacing = random(55,75);
  ellipse(width/2 + eyeSpacing/2, height/3, eyeWidth, eyeHeight);
  ellipse(width/2 - eyeSpacing/2, height/3, eyeWidth, eyeHeight);
  
  //draw pupils
    fill(0);
  ellipse(width/2 + eyeSpacing/2, height/3, eyeWidth/3, eyeHeight/3);
  ellipse(width/2 - eyeSpacing/2, height/3, eyeWidth/3, eyeHeight/3);
  
  //draw hair
  fill(200,200,0);
  triangle(width/2, 0, width/4*3, height/2, width/3, 50);
  
  //draw mouth
  stroke(100);
  strokeWeight(5);
  line(width/2+20, height/2-5, width/2-20, height/2+5);
  
}