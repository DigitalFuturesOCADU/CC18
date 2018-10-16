/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Blink the internal LED without using a simple timer instead of delay
 *  
 * 
 * 
 */


int ledPin1 = 9;           //the pin the LED is attached to pin 13 attaches to an internal LED  
int blinkRate = 100;        //the time between blinks in milliseconds
boolean ledState1 = false;


long lastTimeYouBlinked;  //this stores the time of the last change


void setup() {
  pinMode(ledPin1, OUTPUT);                  //Set the pin to output mode
}

void loop() {
  // put your main code here, to run repeatedly:

if(millis()-lastTimeYouBlinked>=blinkRate) //this very simple statement is the timer,
{                                          //it subtracts the value of the moment in time the last blink happened, and sees if that number is larger than your set blinking value
  if(ledState1==false)                     //This statement is used to see if it should be turning the LED on or off by looking at its current state            
    {
     digitalWrite(ledPin1,HIGH);          //This statement addresses the LED itself and turns it on. because it was previously off
     ledState1=true;                      //It then flips then changes its current value to true
    }
  else                                    //Since there are only 2 options, we can use an else
  {
    digitalWrite(ledPin1, LOW);           //this event happens when the LED is on so we write the pin to be LOW , which means off
    ledState1=false;                      //save that value
  }

lastTimeYouBlinked = millis();            //save the value in time that this switch occured, so we can use it again.
   
}






}
