/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Read a value from Adafruit IO
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
 * 
 * 
 *  * ***NOTE***
   When Wifi is enabled you can only use these pins as analog inputs
   A2
   A3
   A4
   A9 - 33
   A7 - 32
 */


#include "AdafruitIO_WiFi.h"



//get this data from your adafruit.io account
//login and click View AIO Key

#define IO_USERNAME "npuckett"
#define  IO_KEY "657dc16674f347e5ad2f4c805abb0f60"

//for ocad wifi make sure you have registered the MAC address of your board
//if you are testing this somewhere else, you'll need to update these settings
#define WIFI_SSID "ocadu-embedded"
#define WIFI_PASS "internetofthings"

AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);   

AdafruitIO_Feed *val1 = io.feed("testSensor");                       //This creates the feed and gives it the name "sensor1"
                                                                 //if the feed already exists it connects you to it.
int refreshRate = 2000;                         //free account on AIO is limited to 30 per minute
unsigned long lastRefresh = 0;                  //used to create the sending timer
int errorCounter = 0;


long remoteVal1;                      //this variable will hold the value we read from AIO




void setup() 
{


Serial.begin(9600);


connectToAIO();                           //connect to the service
}

void loop() 
{
updateAIOfeeds();



}

void connectToAIO()
{
io.connect();  //connect to the server using your login credentials
Serial.println("Connecting to Server");


val1->onMessage(readIncoming);  ///connect the feed to a callback function to handle incoming data


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
  
  val1->save(random(0,255));            //////////***********remove this line.
                                        //////////*********It is publishing to the same channel for testing
  
  
  io.run(); //update everything on AIO
  
  lastRefresh=millis();
  }
}


void readIncoming(AdafruitIO_Data *inData)   ///callback function for handling the incoming data
                                              //this was defined inside the connectAIO function.  line 82    
{
  
  remoteVal1=atol(inData->value());
  Serial.print("Incoming Value: ");
  Serial.println(remoteVal1);

}
