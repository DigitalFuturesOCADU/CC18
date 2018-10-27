//Creation&Computation
//reads 2 sensor values from arduino
//draws circles based on the analog sensor values
//requires p5.serialcontrol to be running
//and arduino running the sensorOutput1 sketch




var serial;       //variable to hold the serial port object
var ardVal = [];  //array that will hold all values coming from arduino

var serialPortName = "COM7";        //FOR PC it will be COMX on mac it will be something like "/dev/cu.usbmodemXXXX"
                                    //Look at P5 Serial to see the available ports

function setup() {
  
  createCanvas(1023,1023);
  //Setting up the serial port
  serial = new p5.SerialPort();       //create the serial port object
  serial.open(serialPortName);        //open the serialport. determined 
  serial.on('open',ardCon);           //open the socket connection and execute the ardCon callback
  serial.on('data',dataReceived);     //when data is received execute the dataReceived function
}

function draw() {
  background(255);
  stroke(0);
  
  strokeWeight(map(ardVal[0],0,1023,0.5,10));
  fill(255,0,0,map(ardVal[0],0,1023,10,255));
  ellipse(width/4,height/2,ardVal[0],ardVal[0]); //apply the sensor value to the radius of the ellipse
  
  strokeWeight(map(ardVal[1],0,1023,0.5,10));  
  fill(0,0,255,map(ardVal[1],0,1023,10,255));
  ellipse(width/2+width/4,height/2,ardVal[1],ardVal[1]);
  
  
}


function dataReceived()   //this function is called every time data is received
{
var rawData = serial.readStringUntil('\r\n'); //read the incoming string until it sees a newline
    if(rawData.length>1)                      //check that there is something in the string
    {                                         //values received in pairs  index,value
      var incoming = rawData.split(",");      //split the string into components using the comma as a delimiter
      for(var i=0;i<incoming.length;i++)
      {
      ardVal[i]=parseInt(incoming[i]);        //convert the values to ints and put them into the ardVal array
      }
    }
}

function ardCon()
{
  console.log("connected to the arduino!! Listen UP");
}