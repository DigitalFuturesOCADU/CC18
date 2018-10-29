/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Read Potentiometer, scale the value to different ranges and print it over the Serial port
 *  
 * 
 * 
 */

int potentiometerPin = A3;  //the analog input pin the sensor is attached to
int rawValue;   //variable to hold the raw bit value 0 -1023
int scaledVal1; //we'll use this to map the input value to a range for an LED brightness
int scaledVal2; //map this one to a rotational value
int LED = 9;

void setup() 
{
 
Serial.begin(9600);  //turn on the serial port
pinMode(LED, OUTPUT);
}

void loop() 
{

  rawValue = analogRead(potentiometerPin);  //read the sensor value and store it
  scaledVal1 = map(rawValue,0,1023,0,255);  //re scale the vale using map()
  scaledVal2 = map(rawValue,0,1023,0,180);  // do it again
  analogWrite(LED, scaledVal1);

  
  Serial.print("Raw Value : ");             //print all of this out of the serial monitor
  Serial.print(rawValue);
  Serial.print(" ");
  Serial.print("Scaled for brightness : ");
  Serial.print(scaledVal1);
  Serial.print(" ");
  Serial.print("Scaled for rotation : ");
  Serial.println(scaledVal2);
 
  

}
