/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Multi Servo Sweep
 * Based on basic Sweep example, but updated to use a timer 
 * 
 * 
 */

#include <Servo.h>

int servoPin1 = 2;           //Pin that the servo is attached to.
int moveRate = 10;        //the time between updates in milliseconds
int minAngle = 0;     //sets the low point of the movement range
int maxAngle = 180;   //sets the high point of the movement range
int moveIncrement = 1;    // how much to move the motor each cycle 
int servoAngle1;

long lastTimeYouMoved1;

Servo servo1;  // create the Servo object

void setup() {
servo1.attach(servoPin1);  //attach the servo to the corresponding control pin
servoAngle1=minAngle;

}

void loop() {
 if(millis()-lastTimeYouMoved1>=moveRate) //this very simple statement is the timer,
{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value
servo1.write(servoAngle1);

servoAngle1 += moveIncrement;

  if (servoAngle1 <= minAngle || servoAngle1 >= maxAngle) 
  {
    moveIncrement = -moveIncrement;
  }

lastTimeYouMoved1 = millis();            //save the value in time that this switch occured, so we can use it again.
   
}

}
