/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Fade between 2 colors using a sin wave
 * adapted from the LED fading arduino example
 * 
 */




var countInc = 0.07;
var countVal = 0;

var color1;
var color2;
var xFadeVal = 0;

var lastTimeYouChanged = 0;  //this stores the time of the last change


function setup() {
               

  createCanvas(windowWidth, windowHeight);
  color1 = color(255,0,250);
  color2 = color(200,250,30);
}

function draw() 
{
countVal+=countInc;  //countVal = countVal + countInc
xFadeVal = map(sin(countVal),-1,1,0.0,1.0);

background(lerpColor(color2,color1,xFadeVal));

fill(lerpColor(color1,color2,xFadeVal));
noStroke();

ellipse(width/2,height/2,height/3,height/3);





}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}