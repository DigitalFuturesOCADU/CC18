# JSON as a data protocol

These examples use the JSON data format to send/read data between P5 and Arduino. JSON is used as a standard protocol on the web for data exchange and thus is integrated into P5 by default.  To encode/decode data on the Arduino side it requires an additional library.  These examples use the  arduinojson library.  [www.arduinojson.org](https://arduinojson.org/v5/doc/)

[These examples use the standard P5 Serial Server and P5 serial library](https://github.com/vanevery/p5.serialcontrol/releases)

##Installing arduinojson

In the Arduino IDE go to: Sketch -> Include Library -> Manage Libraries
Search arduinojson
**ImportantDo not install the default version.
From the dropdown - choose version 5.13.3
Click Install**


##Sending data from Arduino

Step1: Allocate a buffer in memory , in this case called  messageBuffer
Step2: Create the base JSON object, in this case called  p5Send

```arduino
 DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Send = messageBuffer.createObject();     //create a JsonObject variable in that buffer       
```

Step3: Add a named paramter to the JSON object and assign it a value

This uses 2 parameters
s1
s2

```arduino
p5Send["s1"]=buttonValue; 
p5Send["s2"]=anaValue;  
```

To send the json over the serial port we use the built in .printTo(Serial) function that is part of the arduinojson library
We follow the command with a standard Serial.println() command.
This is done to mark the end of the message with a newline \n character

```arduino
  p5Send.printTo(Serial);                                 //print JSON object as a string
  Serial.println();  
```  


To stabilize the send data it MUST be sent at a standard rate.  These examples use a timer to acheive this.


##Reading data into P5

These examples use the standard serial library methods in P5 and simply adds JSON functionality to the receiving function

This uses a receiving funtion called dataReceived
```javascript
serial.on('data',dataReceived);
```

```javascript
function dataReceived()   //this function is called every time data is received
{
  
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    console.log(rawData);                   //uncomment this line to see the incoming string in the console     
    if(rawData.length>1)                      //check that there is something in the string
    {                                         
      
      sensor1 = JSON.parse(rawData).s1;       //the parameter value .s1 must match the parameter name created within the arduino file
      sensor2 = JSON.parse(rawData).s2; 
    }
}
```

The majority of this function remains the same regardless of the data. The section of the code that you should customize for your own parameters.

```javascript

sensor1 = JSON.parse(rawData).s1;       
sensor2 = JSON.parse(rawData).s2;
```
.s1 and .s2 are the names of the parameters created on the arduino These parameter names can be anything you want, but they have to match

## Sending data from p5

The method for sending from P5 is very similar to sending from arduino, but because it is a full function language on a PC, thus there are many more tools available.


First we define a JSON object
```javascript
var ardSend = {}; //uses {} to define it as a JSON variable
```

It then uses a function called sendData to package and send the data to arduino
```javascript
function sendData()
{
  
  ardSend.led1 = sendVal1;                      //add the value to the led1 parameter on the json object
  ardSend.led2 = sendVal2;                      //add the value to the led2 parameter on the json object

  var sendString = JSON.stringify(ardSend);     //convert the json to a string  
  console.log(sendString)

  serial.write(sendString);                     //send it over the serial port    
  serial.write('\n');                           //write a new line character

}
```
This example creates 2 parameters

led1
led2

and assigns a value to them.

The actual sending functionality is done via a setInterval command which is native to javascript.  This is essentially a timer that executes a function at a specified rate.  This is done in the setup() function.
```javascript
  //setting the send rate
  setInterval(sendData,50);         //built in javascript function that executes a funtion every XXXX milliseconds
                                    //in this case we use it to execute the sendData function we do this to stabilize the send function 
``` 

##Reading the data into arduino

We use the same arduinojson library to do this, and simlar to the other direction we use the parameter name to get the value
```arduino
  DynamicJsonBuffer messageBuffer(200);                   //create the Buffer for the JSON object        
  JsonObject& p5Read = messageBuffer.parse(Serial);      //create a JsonObject variable and attach it to incoming Serial messages     
 
  p5Input1 = p5Read["led1"];
  p5Input2 = p5Read["led2"];

  analogWrite(LEDpin1,p5Input1);
  analogWrite(LEDpin2,p5Input2); 
```
