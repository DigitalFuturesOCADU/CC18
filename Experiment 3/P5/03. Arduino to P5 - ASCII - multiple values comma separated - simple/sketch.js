var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial
var inData;                             // for incoming serial
var xPos = 0;                           // x position of the graph
var locH, locV;        // location of the circle
var circleColor = 255; // color of the circle

function setup() {
	createCanvas(400, 300);
  background(0, 0, 255);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(portName);              // open a serial port
}

function draw() {
 background(0);               // black background
 fill(circleColor, 0, 0);           // fill depends on the button
 ellipse(locH, locV, 50, 50); // draw the circle
}

 
 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
    // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 1) {                      // if there are three elements
      locH = map(sensors[0], 0, 1023, 0,width);   // element 0 is the locH
      locV = map(sensors[1], 0, 1023, 0, height); // element 1 is the locV
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}
