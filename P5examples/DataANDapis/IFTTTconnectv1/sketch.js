/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Allows you to send data to Adafruit IO + IFTTT
 * 
 */


var aiokey = "657dc16674f347e5ad2f4c805abb0f60";//get this from your account
var userName = "npuckett"; //get this from your account
var channelName1 = "stuffFromP5"; //choose a name
var channelName2 = ""; //choose a name

function setup()
{





}


function draw()
{


}

function mousePressed()
{
var randVal1 = random(0,400);
iftttSend1(userName,aiokey,channelName1,randVal1);

//var randVal2 = random(100,400);
//iftttSend2(userName,aiokey,channelName1,randVal1, channelName1, randVal2);
	
}


function iftttSend1(uName, key, cName, cVal)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName+"="+cVal);
httpGet(sendURL);
}

function iftttSend2(uName, key, cName1, cVal1, cName2, cVal2)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName1+"="+cVal1+"&"+cName2+"="+cVal2);
httpGet(sendURL);
}


