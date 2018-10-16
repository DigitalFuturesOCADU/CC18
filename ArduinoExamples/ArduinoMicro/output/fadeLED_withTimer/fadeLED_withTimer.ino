/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Fade an LED using a timer
 * Based on Basic Arduino Fade example, but updated to remove the delay 
 * 
 * 
 */


int ledPin1 = 9;           //Pin that the led is attached to - check that it is a PWM pin  
int fadeRate = 10;        //the time between updates in milliseconds
int minBrightVal = 0;     //sets the low point of the fade range
int maxBrightVal = 255;   //sets the high point of the fade range
int fadeIncrement = 1;    // how much to change the brightness each cycle 
int ledBrightness;

long lastTimeYouChanged;  //this stores the time of the last change


void setup() {
  pinMode(ledPin1, OUTPUT);                  //Set the pin to output mode
  ledBrightness = minBrightVal;

}

void loop() {
  // put your main code here, to run repeatedly:

if(millis()-lastTimeYouChanged>=fadeRate) //this very simple statement is the timer,
{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value
analogWrite(ledPin1,ledBrightness);

ledBrightness += fadeIncrement;

  if (ledBrightness <= minBrightVal || ledBrightness >= maxBrightVal) {
    fadeIncrement = -fadeIncrement;
  }

lastTimeYouChanged = millis();            //save the value in time that this switch occured, so we can use it again.
   
}






}
