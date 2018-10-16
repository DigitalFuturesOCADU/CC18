/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Blink multiple LEDs at different rates using timers
 *  
 * 
 * 
 */


int ledPin1 = 9;   //define the pins that the LEDs will be attached to
int ledPin2 = 6;
int ledPin3 = 5;
int ledPin4 = 3;

int blinkRate1 = 400;   //define the corresponding rates
int blinkRate2 = 500;
int blinkRate3 = 200;
int blinkRate4 = 1000;

boolean ledState1 = false;    //store the current state of each led.  false = off
boolean ledState2 = false;
boolean ledState3 = false;
boolean ledState4 = false;

long lastTimeYouBlinked1;     //variables for holding the time value of when each LED last changed
long lastTimeYouBlinked2;
long lastTimeYouBlinked3;
long lastTimeYouBlinked4;

void setup() {
 

pinMode(ledPin1,OUTPUT);   //set all of the pins to output
pinMode(ledPin2,OUTPUT);  
pinMode(ledPin3,OUTPUT);  
pinMode(ledPin4,OUTPUT);


}

void loop() {


/////LED1                                           //the same timer functions we used before, just multiplied
if(millis()-lastTimeYouBlinked1>=blinkRate1)
{
ledState1 = !ledState1;     //the toggle function. only on boolean variables says to be the opposite of your current state
lastTimeYouBlinked1 = millis();
}

////LED2
if(millis()-lastTimeYouBlinked2>=blinkRate2)
{
ledState2 = !ledState2;
lastTimeYouBlinked2 = millis();
}
///LED3
if(millis()-lastTimeYouBlinked3>=blinkRate3)
{
ledState3 = !ledState3;
lastTimeYouBlinked3 = millis();
}
///LED4
if(millis()-lastTimeYouBlinked4>=blinkRate4)
{
ledState4 = !ledState4;
lastTimeYouBlinked4 = millis();
}

digitalWrite(ledPin1,ledState1);  //write the value to each PIN
digitalWrite(ledPin2,ledState3);
digitalWrite(ledPin3,ledState2);
digitalWrite(ledPin4,ledState4);


}
