/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * Experiment 3 - Example 01. Arduino to P5.js - sending single value as a byte
 * 
 * Based on "Lab: Serial Input to P5.js" on ITP Physical Computing site
 * https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
 * 
 * Circuit: (1) potentiometer connected to pin A0
 */
 
 void setup() {
 Serial.begin(9600); // initialize serial communications
}
 
void loop() {
 int potentiometer = analogRead(A0);                  // read the input pin
 int mappedPot = map(potentiometer, 0, 1023, 0, 255); // remap the pot value to fit in 1 byte
 Serial.write(mappedPot);                             // print it out the serial port
 delay(1);                                            // slight delay to stabilize the ADC
}
