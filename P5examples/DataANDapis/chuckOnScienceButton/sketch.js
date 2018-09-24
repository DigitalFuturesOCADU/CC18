/*
* Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett

Uses the Chuck Norris API + P5.speech

http://ability.nyu.edu/p5.js-speech/
https://api.chucknorris.io/

possible voices: https://jsfiddle.net/api/mdn/
potential topics: https://api.chucknorris.io/jokes/categories

*/


var serial;

var baseURL = 'https://api.chucknorris.io/jokes/random?category='
var topics = ["explicit","dev","movie","food","celebrity","science","political","sport","religion","animal","music","history","travel","career","money","fashion"] ;  
var tHeight = 180;
var sendURL;
var voiceOfChuck = new p5.Speech();




	



function setup()
{

createCanvas(800,600);

textAlign(CENTER);
textSize(tHeight/2);
noStroke();
text("CLICK CHUCK",width/2,height/2+(tHeight/2))


serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList);


}


function draw()
{


}

function enlightenME(knowledge)
{
console.log(knowledge.value);
voiceOfChuck.setVoice('Cellos');
voiceOfChuck.setRate(2);
voiceOfChuck.setPitch(1);
voiceOfChuck.speak(knowledge.value);
}


function mousePressed()
{

background(255);
var rTopic = topics[2];
sendURL = baseURL + rTopic;
textSize(tHeight);
text(rTopic,width/2,height/2+(tHeight/2))	

loadJSON(sendURL,enlightenME);

}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}



