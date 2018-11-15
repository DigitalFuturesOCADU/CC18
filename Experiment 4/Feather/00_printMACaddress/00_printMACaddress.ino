#include "esp_system.h"

void setup()
{
Serial.begin(9600);
Serial.print("***MAC ADDRESS***  ");
Serial.println(getMacAddress());
  
}

void loop()
{}








String getMacAddress() {
  uint8_t baseMac[6];
  // Get MAC address for WiFi station
  esp_read_mac(baseMac, ESP_MAC_WIFI_STA);
  char baseMacChr[18] = {0};
  sprintf(baseMacChr, "%02X-%02X-%02X-%02X-%02X-%02X", baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5]);
  return String(baseMacChr);
}
