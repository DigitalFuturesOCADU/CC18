/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Reads the 3 positions of the Toggle Switch: LEFT CENTER RIGHT
 * 
 * 
 * 
 */


int togPin1 = 7;
int togPin2 = 9;

int togVal1;
int togVal2;


void setup() {
  // put your setup code here, to run once:
  pinMode(togPin1, INPUT_PULLUP);
  pinMode(togPin2, INPUT_PULLUP);

}

void loop() {
  togVal1 = digitalRead(togPin1);
  togVal2 = digitalRead(togPin2);

  Serial.print("Tog1 val: ");
  Serial.print(togVal1);
  Serial.print("  Tog2 val: ");
  Serial.print(togVal2);
  
if((togVal1==1)&&(togVal2==1))
{
Serial.println("---Center---");  
}
if((togVal1==1)&&(togVal2==0))
{
  Serial.println("---LEFT---");
}
if((togVal1==0)&&(togVal2==1))
{
  Serial.println("---RIGHT---");
}

}
