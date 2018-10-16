/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Button Input using the internal PUllUP resistor
 *  
 * 
 * 
 */

int buttonPin = 3;  // the pin the + leg of the button is attached to
int buttonState;  //variable that will hold the On / Off state of the button.


void setup() {
pinMode(buttonPin, INPUT_PULLUP);   //set the pin to be an input and and turn on the pullup resistor
Serial.begin(9600);  //Turn on the Serial port so we can see the button's value
}

void loop() {
  buttonState = digitalRead(buttonPin);  //read the value on the pin and store it in the variable

  Serial.print("Button State is: ");     //print the value to the Serial Monitor
  Serial.println(buttonState);

}
