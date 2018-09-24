/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Fade a the color of a circle in / out
 * adapted from the LED fading arduino example
 * 
 */

         //Pin that the led is attached to - check that it is a PWM pin  
var fadeRate = 10;        //the time between updates in milliseconds
var minBrightVal = 0;     //sets the low point of the fade range
var maxBrightVal = 255;   //sets the high point of the fade range
var fadeIncrement = 5;    // how much to change the brightness each cycle 
var ledBrightness;

var colorR = 100;
var colorG = 200;
var colorB = 50;

var lastTimeYouChanged = 0;  //this stores the time of the last change


function setup() {
               //Set the pin to output mode
  ledBrightness = minBrightVal;
  createCanvas(windowWidth, windowHeight);
}

function draw() 
{



if(millis()-lastTimeYouChanged>=fadeRate) //this very simple statement is the timer,
{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value

fill(colorR,colorG,colorB,ledBrightness);



ledBrightness += fadeIncrement;

  if (ledBrightness <= minBrightVal || ledBrightness >= maxBrightVal) {
    fadeIncrement = -fadeIncrement;
  }

lastTimeYouChanged = millis();            //save the value in time that this switch occured, so we can use it again.
   
}

background(255);
ellipse(width/2,height/2,height/3,height/3);

}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}