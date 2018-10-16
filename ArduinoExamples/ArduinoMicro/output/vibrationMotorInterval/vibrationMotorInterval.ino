/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Turn on/off a motor for a set amount of time
 *  
 * 
 * 
 */

int motorPin = 3;
int timeOnOff = 3000;      // in milliseconds
int onSpeed = 255;  //0 means off , 255 is max speed, thus 128 is half speed



long lastSwitchTime;    
boolean motorState = true;
int motorOutput;

void setup() 
{
  pinMode(motorPin, OUTPUT);

}

void loop() 
{
    if(millis()-lastSwitchTime>=timeOnOff)
    {
      motorState = !motorState;
      lastSwitchTime = millis();
    }

    if(motorState)
    {
      motorOutput = onSpeed;
    }

    else
    {
      motorOutput = 0;
    }

    analogWrite(motorPin, motorOutput);

}
