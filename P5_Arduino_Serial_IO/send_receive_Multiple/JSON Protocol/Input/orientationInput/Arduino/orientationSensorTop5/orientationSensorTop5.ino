/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Orientation Sensor: https://github.com/adafruit/Adafruit_Sensor
 * Simple Read and print of the X Y Z angles of orientation in degrees 
 * For Arduino Micro
 * O Sensor       Arduino
 * SDA*            D2            
 * SCL*            D3
 * 
 * *You must connect a 4.7K resistor between the SDA connection on the sensor and +5V
 * *You must connect a 4.7K resistor between the SCL connection on the sensor and +5V
 * 
 * 
 * This example sends the values over the serial port using the JSON protocol
 * 
 * 
 * 
 */
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>

#include <ArduinoJson.h>
//*****BE SURE TO INSTALL VERSION 5.13.3 OF THE LIBRARY IT INSTALL V6BETA BY DEFAULT

  
Adafruit_BNO055 orientationSensor = Adafruit_BNO055();  //create a orienation sensor object


unsigned long lastRead;   //used for the sampleRate timer
int sampleRate = 100;     //the sampleRate for reading the sensor.  Without this it will crash.


float xOrientation;     //holds the X orientation    Degrees
float yOrientation;     //holds the Y orientation    Degrees
float zOrientation;      //holds the Z orientation   Degrees



void setup() 
{
  Serial.begin(9600);
  
  
  if(!orientationSensor.begin()) //connect to the sensor and print an error if there is a problem
  {
  
    Serial.println("Can't connect to the Sensor. Check the Wiring");
    while(1);
  }
  
  delay(1000);  ///wait for one second for everything to start up.
    
  orientationSensor.setExtCrystalUse(true);
}

void loop() 
{

  if(millis()-lastRead>=sampleRate)
  {
  
  sensors_event_t event; //create an event variable
  orientationSensor.getEvent(&event); //pass it to the BNO055 object

  //get the values
  xOrientation = event.orientation.x;
  yOrientation = event.orientation.y;
  zOrientation = event.orientation.z;


/////////////////////////////create the message for p5
  DynamicJsonBuffer messageBuffer(200);                     //create a buffer in memory to hold the json object
  JsonObject& p5Send= messageBuffer.createObject();        //create the object 
  p5Send["oX"]=xOrientation;                                //create a parameter called oX and assign the value from the sensor
  p5Send["oY"]=yOrientation;                                //create a parameter called oY and assign the value from the sensor
  p5Send["oZ"]=zOrientation;                                //create a parameter called oX and assign the value from the sensor
                                                            //*Note you will need to remember the parameter name to access the data in p5
  p5Send.printTo(Serial);                                   //send the JSON object over the Serial Port
  Serial.println();                                         //print a newline character to separate the messages
////////////////////////////create the message for p5  
  
  lastRead = millis(); //save the value of the current time so the timer works
  }
}
