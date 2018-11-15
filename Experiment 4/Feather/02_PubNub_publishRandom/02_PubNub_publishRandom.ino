/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * 
 * PubNub Test
 * Connect device to the eduroam network - tested with Huzzah32 ESP32
 * Publish random values to the specified channel 
 * 
 * 
 */


#include <ArduinoJson.h> 
#include "esp_wpa2.h"
#include <WiFi.h>
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <wifiDetails.h>


const static char pubkey[] = "";  //get this from your PUbNub account
const static char subkey[] = "";  //get this from your PubNub account

const static char pubChannel[] = "testChannel"; //choose a name for the channel to publish messages to


unsigned long lastRefresh = 0;    //used to make the timer work
int publishRate = 2000;           //how often to update the value on pubnub in milliseconds


int myVal1;                       //variables to hold values to send
int myVal2;
String whoAmI = "myName";

int connectionMode = 0;   //0 = connect to OCAD WIFI ,  1 = connect to your home WIFI
                          //This requires that you have wifiDetails installed in your library folder and have input your correct details


void setup() 
{
Serial.begin(9600);
connectEduRoam();
//connectStandardWifi();


PubNub.begin(pubkey, subkey);                      //connect to the PubNub Servers
Serial.println("PubNub Connected");

}

void loop() 
{
  myVal1 = random(0,10);          //this example just sends random numbers.  pick the two numbers
  myVal2 = random(100,200);
 
 

  if(millis()-lastRefresh>=publishRate)   //timer used to publish the values at a given rate
  {
  publishToPubNub();                      //execute the function that sends the values to pubnub
  lastRefresh=millis();                   //save the value so that the timer works
  }



}



void publishToPubNub()
{
  WiFiClient *client;
  DynamicJsonBuffer messageBuffer(600);                    //create a memory buffer to hold a JSON Object
  JsonObject& pMessage = messageBuffer.createObject();    //create a new JSON object in that buffer
  
 ///the imporant bit where you feed in values
  pMessage["who"] = whoAmI;
  pMessage["randoVal1"] = myVal1;                      //add a new property and give it a value
  pMessage["randoVal2"] = myVal2;                     //add a new property and give it a value
 
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
