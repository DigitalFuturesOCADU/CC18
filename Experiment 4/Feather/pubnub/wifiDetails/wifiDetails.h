#include "esp_wpa2.h"
#include <WiFi.h>

// Location 0: OCAD (this will only work if the MAC address of your device has been registered)
const char* ssid_ocad     = "ocadu-embedded";   
const char* password_ocad = "internetofthings";

// Location 1: home
const char* ssid_home     = ""; // add the name for your home network
const char* password_home = ""; // add the Wifi password for your home network


void connectStandardWifi(int location_number)
{
    Serial.print("Connecting to Wifi ");

    if(location_number == 0){
        Serial.println(ssid_ocad);
        WiFi.begin(ssid_ocad, password_ocad);
    }

    if(location_number == 1){
        Serial.println(ssid_home);
        WiFi.begin(ssid_home, password_home);
    }

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    
    Serial.print("!CONNECTED!");
    Serial.println("IP address: ");
    Serial.print(WiFi.localIP());

}