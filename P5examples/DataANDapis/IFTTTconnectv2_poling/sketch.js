/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Allows you to read data from Adafruit IO + IFTTT
 * 
 */



var aiokey = "657dc16674f347e5ad2f4c805abb0f60";//get this from your account
var userName = "npuckett"; //get this from your account
var channelName = "stuffFromP5"; //choose a name

var pollingRate = 2500;
var lastCheck = 0;

var incomingVal1;
var currentVal1;


function setup()
{





}


function draw()
{
 if(millis()-lastCheck>=pollingRate)
 {
 	iftttCheck(userName,aiokey,channelName);
 	lastCheck=millis();
 }

}

function mousePressed()
{


//iftttCheck(userName,aiokey);
}


function iftttSend1(uName, key, cName, cVal)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName+"="+cVal);
httpGet(sendURL);
}

function iftttCheck(uName, key)
{
var checkURL = ("https://io.adafruit.com/api/groups/"+uName+"/receive.json?x-aio-key="+key);
loadJSON(checkURL,newData);

console.log(checkURL);

}

function newData(incomingData)
{
	console.log(incomingData.feeds[0].last_value);
}








