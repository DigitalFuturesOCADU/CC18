/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Introduces the grid of clickable objects we will use in the next exampl
 * Example of dealing with simple classes in javascript
 * 
 * Clicking on an object makes it oscillate faster
 */

// server variables
var dataServer;
var pubKey = 'pub-c-8b0a0cf3-95ea-4548-9789-6f418cb6c8dc';
var subKey = 'sub-c-5c05ce6e-a685-11e8-a6fb-8693ddbf4771';
var channelName = "clicks";

//These variables are used to manage our circle objects
var ripples = [];   //array that will hold the objects
var totRx = 10;     //how many to create in X direction of the grid
var totRy = 15;     //how many to create in Y direction of the grid
var border = 50;    //pixel boarder around the grid
var maxRadius;      //sets the max size of each circle based on the size of the window
var showCount = true;

function setup() 
{

  createCanvas(600,1200);
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming, presence: whoisconnected })
  dataServer.subscribe({channels: [channelName]});


  maxRadius = (width-border)/(totRx*2); //calculate the max size of the circles based on the window size
  

//create a grid of circles using the Ripple class *see below for class
  for (var rx = 0; rx<totRx; rx++)
  {
    for (var ry = 0; ry<totRy; ry++)
    {
      ripples.push(new Ripple(map(rx,0,totRx,border,width-border),map(ry,0,totRy,border,height-border),5,maxRadius));
    }

  }

}

function draw() 
{

background(255);

  //cycle through the ripples array that holds all of the objects to perform the calculations on each one.
  for (var i = 0;i<ripples.length;i++)
  {
    ripples[i].display();  //this calls the display function inside each object
  }

}



//This is the ripple class created that defines each of the circles and their movement
function Ripple(x,y,minSize,maxSize)
{

//these are the local variables for the class 
this.x = x;
this.y = y;
this.minSize = minSize;
this.maxSize = maxSize+10;
this.totalClicks = 0;
this.speed = 0.001;
this.randStart = random(0,1000);
this.maxClicks = 20;

///this is the function that is called in draw to perform calculations on each and draw the circles
this.display = function()
{
fill(0,255,0,map(this.totalClicks,0,this.maxClicks,0,100))  //increases opacity with more clicks
stroke(0);
strokeWeight(0.2);

//this draws the actual circle
ellipse(this.x, this.y, map(sin((millis()+this.randStart)*this.speed),-1,1,this.minSize,this.maxSize));

//if statement lets us toggle showing the count by pressing the h key
  if(showCount)
  {
    if(this.totalClicks>0)  //if it has been clicked on show how many times
    {
      fill(0);
      noStroke();
      textSize(12);
      textAlign(CENTER,CENTER);
      text(this.totalClicks,this.x,this.y);
    }
  }
}

//this function checks if the circle has been clicked on
//if yes it increments the this.totalClicks until it reaches the maximum
this.hitCheck = function(mx, my)
{
  if(dist(this.x,this.y,mx,my)<(maxRadius-1))
  {
    
    if(this.totalClicks+1<=this.maxClicks)
    {
    this.totalClicks+=1; 
    this.maxSize+=2;
    // console.log(this.totalClicks);
    this.speed = map(this.totalClicks,1,this.maxClicks,0.0005,0.01);
    }
  }

}


}


//key press function toggles the showCount variable
//this is used to show / hide the number of clicks on each 
function keyPressed()
{
  if (key === 'h')
  {
  showCount = !showCount;    //this is called a toggle. It can only be used on boolean variable. It says be the opposite what you are now
  }

}





///uses built in mouseClicked function to send the data to the pubnub server
function mouseClicked() {
 
  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {       //set the message objects property name and value combos    
        x: mouseX,
        y: mouseY 
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
   console.log(inMessage);
  if(inMessage.channel == channelName)
  {
    var clickX = inMessage.message.x;
    var clickY = inMessage.message.y;
    for (var i = 0;i<ripples.length;i++)
    {
    ripples[i].hitCheck(clickX,clickY);  //feed the x y coordinates of all clicks in messages to objects
    }
  }
}

function whoisconnected(connectionInfo)
{

}