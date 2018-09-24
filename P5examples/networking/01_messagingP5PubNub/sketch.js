
//Creation&Computation
//basic server example using pubnub
//
//Based on Shiffman Coding Rainbow#30
//multiuser tool
//each client is assigned a random color + random size
//click within the frame to create a circle of your size/color
//all other clicks will also be shown in your canvas
//uses pubnub instead of writing a NODE server


// server variables
var myUserID;
var dataServer;

//variables for the size and color of your circle
var brushR;
var brushG;
var brushB;
var brushRad;

//size of the active area
var cSizeX = 900;
var cSizeY = 600;

//name used to sort your messages. used like a radio station. can be called anything
var channelName = "brush";

function setup() {
  createCanvas(cSizeX, cSizeY);
  background(255);
  
  
  //pick your random size + color
  brushR = floor(random(0,255));
  brushG = floor(random(0,255));
  brushB = floor(random(0,255));
  brushRad = floor(random(5,50));
  
   // initialize pubnub
  dataServer = PUBNUB.init(
  {
    publish_key   : '',  //get these from the pubnub account online
    subscribe_key : '',  
    uuid: myUserID,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  dataServer.subscribe(  //start listening to a specific channel
  {
    channel : channelName,     //this uses our variable to listen to the correct channel
    message: readIncoming      //the value here must match up with the name of the function that handles the incoming data
  });
  
  myUserID = PUBNUB.uuid();    //get my unique userID from pubnub
}

function draw() {
  //draw a frame that is the same color as your brush
  stroke(brushR,brushG,brushB);
  strokeWeight(10);
  noFill();
  rect(0,0,cSizeX,cSizeY);

}


///uses built in mouseClicked function to send the data to the pubnub server
function mouseClicked() {
  // Draw the ellipse in your canvas
  fill(brushR,brushG,brushB);
  noStroke();
  ellipse(mouseX,mouseY,brushRad,brushRad);
  
  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: {
        userID: myUserID,       //set the message objects property name and value combos    
        x: mouseX,
        y: mouseY,
        r: brushR,
        g: brushG,
        b: brushB,
        rad: brushRad
        
      }
    });

}

function readIncoming(message) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // draw a circle on the screen if the user is someone else
  if(message.userID != myUserID)
  {
    noStroke();
    fill(message.r, message.g, message.b);  //read the color values from the message
    ellipse(message.x, message.y, message.rad, message.rad);  //read the size and postion data and draw the ellipse
  }
}

