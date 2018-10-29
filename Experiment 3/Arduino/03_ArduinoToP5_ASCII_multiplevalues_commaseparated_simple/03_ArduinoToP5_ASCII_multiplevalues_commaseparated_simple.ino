 void setup() {
   // configure the serial connection:
   Serial.begin(9600);
   // configure the digital input:
 }
 
void loop() {

   int sensorValue = analogRead(A0);
   // print the results:
   Serial.print(sensorValue);
   Serial.print(",");
 
   sensorValue = analogRead(A1);
   // print the results:
   Serial.println(sensorValue);
}
