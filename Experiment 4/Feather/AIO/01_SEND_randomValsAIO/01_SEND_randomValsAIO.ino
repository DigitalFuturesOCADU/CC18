/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Test setup for Adafruit IO publishing
 *  
 * Be sure to first install
 * Libraries:
 * Adafruit MQTT
 * Arduino Http
 * Adafruit IO
 * 
 * You will also need to create your account at https://io.adafruit.com
 * 
 * Also, because this library is configured differently you input the details of the SSID + password of 
 * your Wifi here
 */



#include "AdafruitIO_WiFi.h"



//get this data from your adafruit.io account
//login and click View AIO Key

#define IO_USERNAME "XXXXXXX"
#define  IO_KEY "XXXXXXXXXX"

//for ocad wifi make sure you have registered the MAC address of your board
//if you are testing this somewhere else, you'll need to update these settings
#define WIFI_SSID "ocadu-embedded"
#define WIFI_PASS "internetofthings"


AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);    //create the AIO object

AdafruitIO_Feed *val1 = io.feed("testSensor");  //This creates the feed and gives it the name "testSensor"


int refreshRate = 2000;                         //free account on AIO is limited to 30 per minute
unsigned long lastRefresh = 0;                  //used to create the sending timer
int errorCounter = 0;



int randomVal1;



void setup() 
{

Serial.begin(9600);
//while(! Serial);

connectToAIO();
}

void loop() 
{

randomVal1 = random(0,255);                   //picking a random value to send as a test
  
updateAIOfeeds();



}

void connectToAIO()
{
io.connect();  //connect to the server using your login credentials

Serial.println("Connecting to Server");

//update the status in the console as it attempts to make a connection
  while(io.status() < AIO_CONNECTED) 
  {
    Serial.print("-notYet-");
    delay(500);
    errorCounter++;

      if(errorCounter>=10)
      {
        Serial.println("**Something isn't working**");
      }
    
  }
Serial.println("***Success***");  //Successfully connected
Serial.println(io.statusText());
  
}




void updateAIOfeeds()
{
  if(millis()-lastRefresh>=refreshRate)
  {
  val1->save(randomVal1);           //write the value to the val1 property
  Serial.print("sent ");
  Serial.print(randomVal1);
  Serial.print(" @");
  Serial.println(millis());

  io.run(); //update everything on AIO
  
  lastRefresh=millis();
  }




}
