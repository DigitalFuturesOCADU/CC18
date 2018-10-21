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
 */
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>
  
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
  
  //print the data
  Serial.print("X: ");
  Serial.print(xOrientation);
  Serial.print("  Y:  ");
  Serial.print(yOrientation);
  Serial.print("  Z:  ");
  Serial.println(zOrientation);

  

  
  lastRead = millis(); //save the value of the current time so the timer works
  }
}
