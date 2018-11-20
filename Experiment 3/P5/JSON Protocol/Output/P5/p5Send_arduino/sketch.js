//Creation&Computation
//sends the X Y value of the cursor to arduino 
//the coordinates are mapped as led brightness values
//led1 is mapped to the x coordinate
//led2 is mapped to the y coordinate
//requires p5send_arduino.ino to be running on your arduino


var serial;       //variable to hold the serial port object


var ardSend = {}; //uses {} to define it as a JSON variable

var sendVal1;     //variables to hold the values to send to arduino 
var sendVal2;

var serialPortName = "COM7";      //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
                                    //Look at P5 Serial to see the available ports


var sendRate = 100;               //use this with setInterval to stablize the data sending to arduino


var fontSize;
var lineWidth = 2; 




function setup() 
{
  
  createCanvas(windowWidth,windowHeight);
  //Setting up the serial port
  serial = new p5.SerialPort();     //create the serial port object
  serial.open(serialPortName);      //open the serialport. determined 
  serial.on('open',ardCon);         //open the socket connection and execute the ardCon callback

  //setting the send rate
  setInterval(sendData,50);         //built in javascript function that executes a funtion every XXXX milliseconds
                                    //in this case we use it to execute the sendData function we do this to stabilize the send function 

}

function draw() 
{
fontSize = height/35;//adjust the size of the font based on the height of the window

background(255);  //white background
stroke(200);      //black lines

strokeWeight(lineWidth/2);    //make the stroke weight half the width of the other lines
line(0,mouseY,width,mouseY);  // draw horizontal line  at the Y position of the cursor
line(mouseX,0,mouseX,height); // draw vertical line  at the X position of the cursor





////*grabbing/mapping the values to be sent to arduino
sendVal1=floor(map(mouseX,0,width,0,255));       //read the x mouse value and convert it to an LED value
sendVal2=floor(map(mouseY,0,height,0,255));       //read the y mouse value and convert it to an LED value
/////////////




///draw ellipses on screen to show the values that are being sent to the leds

fill(255,255,0,sendVal1);
stroke(255,255,0);
strokeWeight(2);
ellipse(mouseX+25,mouseY-25,40,40);


fill(0,0,255,sendVal2);
stroke(0,0,255);
ellipse(mouseX+25,mouseY-70,40,40);


fill(50);                       
noStroke();                       
textSize(fontSize);                  
textAlign(LEFT);                    
text("led1  :  "+sendVal1,mouseX+50,mouseY-10);
text("led2  :  "+sendVal2,mouseX+50,mouseY-55);

}

function sendData()
{
  
  ardSend.led1 = sendVal1;                      //add the value to the led1 parameter on the json object
  ardSend.led2 = sendVal2;                      //add the value to the led2 parameter on the json object

  var sendString = JSON.stringify(ardSend);     //convert the json to a string  
  console.log(sendString)

  serial.write(sendString);                     //send it over the serial port    
  serial.write('\n');                           //write a new line character

}



function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
  
}