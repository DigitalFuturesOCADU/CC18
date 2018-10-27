//Creation&Computation
//sends 2 values to arduino when clicked.
//can be adapted to send more/any values with a comma separated protocol



var serial;       //variable to hold the serial port object


var sendVals = [];     //array to hold values to send


var serialPortName = "COM7";      //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
                                    //Look at P5 Serial to see the available ports

var fontSize;
var lineWidth = 2; 


function setup() 
{
  
  createCanvas(windowWidth,windowHeight);
  //Setting up the serial port
  serial = new p5.SerialPort();     //create the serial port object
  serial.open(serialPortName); //open the serialport. determined 
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
sendVals[0]=floor(map(mouseX,0,width,0,255));       //read the x mouse value and convert it to an LED value
sendVals[1]=floor(map(mouseY,0,height,0,255));       //read the y mouse value and convert it to an LED value
/////////////




///draw ellipses on screen to show the values that are being sent to the leds

fill(255,255,0,sendVals[0]);
stroke(255,255,0);
strokeWeight(2);
ellipse(mouseX+25,mouseY-25,40,40);


fill(0,0,255,sendVals[1]);
stroke(0,0,255);
ellipse(mouseX+25,mouseY-70,40,40);


fill(50);                       
noStroke();                       
textSize(fontSize);                  
textAlign(LEFT);                    
text("index 0  :  "+sendVals[0],mouseX+50,mouseY-10);
text("index 1  :  "+sendVals[1],mouseX+50,mouseY-55);
}




function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}



function sendData(indexVal, sendVal)
{
  var sendString = (sendVals[0]+','+sendVals[1]+'\n')
  serial.write(sendString);
  
  
}


function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
  
}





