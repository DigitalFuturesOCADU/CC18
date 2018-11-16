/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * 
 * PubNub Test
 * Connect device to the embedded network - tested with Huzzah32 ESP32
 * Read analog values and send them to PubNub 
 * 
 * ***NOTE***
 * When Wifi is enabled you can only use these pins as analog inputs
 * A2
 * A3
 * A4
 * A9 - 33
 * A7 - 32
 * 
 * 
 */


#include <ArduinoJson.h> 
#include "esp_wpa2.h"
#include <WiFi.h>
#define PubNub_BASE_CLIENT WiFiClient
#define PUBNUB_DEBUG
#include <PubNub.h>
#include <wifiDetails.h>


const static char pubkey[] = "pub-c-33c693d9-a9b8-49fa-9cd5-2be9dd17c45b";  //get this from your PUbNub account
const static char subkey[] = "sub-c-d3295a42-e74e-11e8-9318-4a98695c4421";  //get this from your PubNub account

const static char pubChannel[] = "sensorValues"; //choose a name for the channel to publish messages to


unsigned long lastRefresh = 0;    //used to make the timer work
int publishRate = 2000;           //how often to update the value on pubnub in milliseconds



int readPin1 = A2;
int readPin2 = A3;

int sensorVal1;                       //variables to hold values to send
int sensorVal2;

//average sensor values
int avgSensor1;
int avgSensor2;

int counter;



String whoAmI = "myName";



void setup() 
{
Serial.begin(9600);

connectStandardWifi();                              ///connect to Wifi you must have wifiDetails in your library folder for this to work

PubNub.begin(pubkey, subkey);                      //connect to the PubNub Servers
Serial.println("PubNub Connected");

}

void loop() 
{
  
  sensorVal1 = map(analogRead(readPin1),0,4095,0,1023);          //read the sensor value and map it back to 0-1023 range 
  avgSensor1+=sensorVal1;
  
  sensorVal2 = map(analogRead(readPin2),0,4095,0,1023);
  avgSensor2+=sensorVal2;

  counter++;
  if(millis()-lastRefresh>=publishRate)   //timer used to publish the values at a given rate
  {
  avgSensor1 = avgSensor1/counter;
  avgSensor2 = avgSensor2/counter;
    
  publishToPubNub();                      //execute the function that sends the values to pubnub
  lastRefresh=millis();                   //save the value so that the timer works
  
  avgSensor1 = 0;                         //this resets the average, can be removed to calculate the average over the entire time
  avgSensor2 = 0;
  counter=0;
  }



}



void publishToPubNub()
{
  WiFiClient *client;
  DynamicJsonBuffer messageBuffer(600);                    //create a memory buffer to hold a JSON Object
  JsonObject& pMessage = messageBuffer.createObject();    //create a new JSON object in that buffer
  
 ///the imporant bit where you feed in values
  pMessage["who"] = whoAmI;
  pMessage["sensorVal1"] = sensorVal1;                      //add a new property and give it a value
  pMessage["sensorVal2"] = sensorVal2;                     //add a new property and give it a value
  pMessage["avgSensorVal1"] = avgSensor1;
  pMessage["avgSensorVal2"] = avgSensor2;
  //pMessage.prettyPrintTo(Serial);   //uncomment this to see the messages in the serial monitor
  
  
  int mSize = pMessage.measureLength()+1;                     //determine the size of the JSON Message
  char msg[mSize];                                            //create a char array to hold the message 
  pMessage.printTo(msg,mSize);                               //convert the JSON object into simple text (needed for the PN Arduino client)
  
  client = PubNub.publish(pubChannel, msg);                      //publish the message to PubNub

  if (!client)                                                //error check the connection
  {
    Serial.println("client error");
    delay(1000);
    return;
  }
  
  if (PubNub.get_last_http_status_code_class() != PubNub::http_scc_success)  //check that it worked
  {
    Serial.print("Got HTTP status code error from PubNub, class: ");
    Serial.print(PubNub.get_last_http_status_code_class(), DEC);
  }
  
  while (client->available())                                 //get feedback from PubNub
  {
    Serial.write(client->read());
  }
  client->stop();                                             //stop the connection
  Serial.println("Successful Publish");  
}
