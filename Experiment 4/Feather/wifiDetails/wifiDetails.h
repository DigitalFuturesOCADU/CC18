#include "esp_wpa2.h"
#include <WiFi.h>

const char* ssid     = "ocadu-embedded";		//the name of you home network
const char* password = "internetofthings";	//Wifi password of your home network

void connectStandardWifi()
{
    Serial.print("Connecting to Home Wifi ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    
    Serial.print("!CONNECTED!");
    Serial.println("IP address: ");
    Serial.print(WiFi.localIP());

}