#include <Servo.h>

Servo myservo;  // create servo object to control a servo

void setup() {
  Serial.begin(9600);           // initialize serial communications
  myservo.attach(9);
}

void loop() {
  if (Serial.available() > 0) { // if there's serial data available
    int inByte = Serial.read();   // read it
    Serial.write(inByte);         // send it back out as raw binary data
    //analogWrite(5, inByte);       // use it to set the LED brightness
    inByte = map(inByte, 0, 255, 0, 180);     // scale it to use it with the servo (value between 0 and 180)
    myservo.write(inByte);                  // sets the servo position according to the scaled value
    delay(15);
  }
}
