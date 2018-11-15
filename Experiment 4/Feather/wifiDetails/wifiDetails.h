#include "esp_wpa2.h"
#include <WiFi.h>

const char* myLogin = "XXXXXXX@ocadu.ca"; // ocadulogin@ocadu.ca
const char* myPassword = "XXXXXXXXX";  //the password you use for the ocad network



void connectEduRoam()
{
const char* ssid = "eduroam";  
delay(10);
Serial.println();
Serial.println(ssid);
WiFi.disconnect(true);
WiFi.mode(WIFI_STA);
esp_wifi_sta_wpa2_ent_set_identity((uint8_t *)myLogin, strlen(myLogin));
esp_wifi_sta_wpa2_ent_set_username((uint8_t *)myLogin, strlen(myLogin));
esp_wifi_sta_wpa2_ent_set_password((uint8_t *)myPassword, strlen(myPassword));
esp_wpa2_config_t config = WPA2_CONFIG_INIT_DEFAULT();
esp_wifi_sta_wpa2_ent_enable(&config);

Serial.println("MAC address: ");
Serial.println(WiFi.macAddress());
WiFi.begin(ssid);
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("!CONNECTED!");
Serial.println("IP address: ");
Serial.println(WiFi.localIP());
 
 
 
}
