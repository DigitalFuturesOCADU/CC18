/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Receives sensor values from Arduino via PubNub
 * The text is sent to all open sessions, the size and location of the text is randomized for each browser locally 
 */

// server variables

var dataServer;

// Kate's PubNub key
var subKey = 'sub-c-47af4102-e947-11e8-ba08-f2848cfa311c';

//input variables
var mappedX;
var mappedY;

//size of the active area
var cSizeX = 900;
var cSizeY = 600;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "sensorValues";

function setup() 
{
  createCanvas(cSizeX, cSizeY);
  background(255);
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming, presence: whoisconnected })
  dataServer.subscribe({channels: [channelName]});

}

function draw() 
{


}



function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
    background(255);
    noStroke();
    fill(0);  //read the color values from the message
    textSize(30);
    textAlign(CENTER, CENTER);
    mappedX=map(inMessage.message.avgSensorVal1, 0, 1023, 0, width);
    mappedY=map(inMessage.message.avgSensorVal2, 0, 1023, 0, height);
    // mappedX=map(inMessage.message.sensorVal1, 0, 1023, 0, width);
    // mappedY=map(inMessage.message.sensorVal2, 0, 1023, 0, height);
    text(inMessage.message.who, mappedX, mappedY);
    console.log(inMessage.message.who + " " + mappedX + " " + mappedY);
  }
}

function whoisconnected(connectionInfo)
{

}