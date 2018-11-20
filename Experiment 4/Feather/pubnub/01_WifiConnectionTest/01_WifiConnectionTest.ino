/*
   Creation & Computation - Digital Futures, OCAD University
   Kate Hartman / Nick Puckett


   Connection Test
   Once you have gotten the MAC address from your board and it has been added to the ocadu-embedded network
   you can now connect your board to the internet
   Open the Serial monitor and if it prints out the details of a webpage after connection all is well


*/



#include "esp_wpa2.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <wifiDetails.h>






void setup()
{
  Serial.begin(9600);
  // Add your wifi location - "0" for OCAD or "1" for home.
  // Note: you will need to update the wifiDetails.h file with your home wifi credentials.
  connectStandardWifi(0);
  HTTPClient http;

  Serial.print("[HTTP] begin...\n");
  // configure traged server and url
  //http.begin("https://www.howsmyssl.com/a/check", ca); //HTTPS
  //http.begin("http://example.com/index.html"); //HTTP
  http.begin("http://tinytuba.com/index.html"); //HTTP

  Serial.print("[HTTP] GET...\n");
  // start connection and send HTTP header
  int httpCode = http.GET();

  // httpCode will be negative on error
  if (httpCode > 0) {
    // HTTP header has been send and Server response header has been handled
    Serial.printf("[HTTP] GET... code: %d\n", httpCode);

    // file found at server
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println(payload);
    }
  } else {
    Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

void loop() {
  // put your main code here, to run repeatedly:

}
