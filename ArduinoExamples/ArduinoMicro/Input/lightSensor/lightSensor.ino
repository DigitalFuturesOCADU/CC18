/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Reads the value of a light sensor and compares it to the light value at startup
 * It the prints whether it is: Brighter , Darker, or Same
 * 
 * 
 */
int ldrPin = A0;  //the pin it is attached to
int startupValue;  //this will hold the value captured at startup to compare to.


void setup() 
{
 Serial.begin(9600);    //turn on the Serial port
 startupValue = analogRead(ldrPin);  //read the value from the light sensor 

}

void loop() 
{
int currentLightValue = analogRead(ldrPin);  //read the value from the light sensor 


  if(currentLightValue < startupValue)
  {
    Serial.println("DARKER");
  }
  
  if(currentLightValue > startupValue)
  {
    Serial.println("BRIGHTER");
  }
  
  /*else
  { 
  Serial.println("SAME");
  }

*/
 

}
