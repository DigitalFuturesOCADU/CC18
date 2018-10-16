/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Blink multiple LEDs at different rates using timers
 * This example uses an array and a loop to clean up the code 
 * Functionally the same as the blinkMultipleLEDs sketch
 * 
 */


int ledPins[] = {9,6,5,3}; //define the pin numbers
int blinkRates[] = {400,300,200,1000};  //define the blinking Rates
boolean ledStates[] = {false,false,false,false};  //define the current states
long lastTimeYouBlinked[] ={0,0,0,0};   //define the stored time value

int ledTotal = sizeof(ledPins) / sizeof(int);   //this function tells you how big the array is.
                                                //we use this to define our loops



void setup() {
  // put your setup code here, to run once:

for(int i=0;i<ledTotal;i++)                   //for loop to set the value of the pins
{
pinMode(ledPins[i],OUTPUT);  
}

Serial.begin(9600); //turn on the Serial port so we can print values
}

void loop() {


for(int i=0;i<ledTotal;i++)                             //another loop to check the values for each of the pins
{                                                       //the loop/array let us write the function only once and letting the compiler run through the list of values
  if(millis()-lastTimeYouBlinked[i]>=blinkRates[i])
  {
  ledStates[i] = !ledStates[i];
  lastTimeYouBlinked[i] = millis();
  }

digitalWrite(ledPins[i],ledStates[i]);
}

}
