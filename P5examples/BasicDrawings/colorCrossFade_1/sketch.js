/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Fade between 2 colors
 * adapted from the LED fading arduino example
 * 
 */

         //Pin that the led is attached to - check that it is a PWM pin  
var fadeRate = 10;        //the time between updates in milliseconds
var fadeIncrement = 0.005;    // how much to change the brightness each cycle 


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

background(255);

fill(lerpColor(color1,color2,xFadeVal));
noStroke();
ellipse(width/2,height/2,height/3,height/3);
console.log(xFadeVal);

if(millis()-lastTimeYouChanged>=fadeRate) //this very simple statement is the timer,
{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value

xFadeVal += fadeIncrement;

  if (xFadeVal <= 0 || xFadeVal >= 1) {
    fadeIncrement = -fadeIncrement;
  }

lastTimeYouChanged = millis();            //save the value in time that this switch occured, so we can use it again.
   
}



}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}