



          //Pin that the led is attached to - check that it is a PWM pin  
var fadeRate = 10;        //the time between updates in milliseconds
var minBrightVal = 0;     //sets the low point of the fade range
var maxBrightVal = 255;   //sets the high point of the fade range
var fadeIncrement = 10;    // how much to change the brightness each cycle 
var ledBrightness;

var lastTimeYouChanged = 0;  //this stores the time of the last change


function setup() {
                 //Set the pin to output mode
  ledBrightness = minBrightVal;
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  // put your main code here, to run repeatedly:
background(100);
fill(255,0,0,ledBrightness);
ellipse(width/2,height/2,height/4,height/4);
console.log(ledBrightness);


if(millis()-lastTimeYouChanged>=fadeRate) //this very simple statement is the timer,
{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value


ledBrightness += fadeIncrement;

  if (ledBrightness <= minBrightVal || ledBrightness >= maxBrightVal) {
    fadeIncrement = -fadeIncrement;
  }

lastTimeYouChanged = millis();            //save the value in time that this switch occured, so we can use it again.
   
}






}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}

