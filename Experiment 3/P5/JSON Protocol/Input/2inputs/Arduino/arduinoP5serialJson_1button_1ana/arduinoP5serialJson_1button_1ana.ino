/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Send 2 values to P5.js
 * values are formatted as JSON objects
 * This example reads 1 button and 1 analog value  
 * 
 * 
 */
#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT 


int buttonPin = 4;
int analogInPin = A1;

unsigned long lastSend;
int sendRate = 50;
void setup() 
{
  Serial.begin(9600);                                     //turn on the serial port
  pinMode(buttonPin,INPUT_PULLUP);                       //  
}

void loop() 

{
  int buttonValue = digitalRead(buttonPin);               //read the button
  int anaValue = analogRead(analogInPin);                 //read the analog value
 
if(millis()-lastSend>=sendRate)                           //use a timer to stablize the data send
{
////////////////////////////////////////////////////////////send the values to P5 over serial
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Send = messageBuffer.createObject();      //create a JsonObject variable in that buffer       
  
  p5Send["s1"]=buttonValue;                               //assign buttonValue to the key "s1" in the json object
  p5Send["s2"]=anaValue;                                  //assign anaValue to the key "s2" in the json object 
  

  
  p5Send.prettyPrintTo(Serial);                                 //print JSON object as a string
  Serial.println();                                       //print a \n character to the serial port to distinguish between objects

lastSend = millis();
}  

}
