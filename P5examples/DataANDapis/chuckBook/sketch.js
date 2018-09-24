/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Pull Data from Chuck Norris API and post it as a status on a Facebook Page
 * Uses AIO and IFTTT
 */


var aiokey = "";  //use yours
var userName = ""; //use yours
var channelName = ""; //use yours

var baseURL = 'https://api.chucknorris.io/jokes/random?category='
var topic = 'sport';  
var sendURL = baseURL+topic;

function setup()
{





}


function draw()
{


}

function mousePressed()
{

loadJSON(sendURL,enlightenME);	
var randVal = "random";//random(0,400);
iftttSend1(userName,aiokey,channelName,randVal);
	
}


function iftttSend1(uName, key, cName, cVal)
{
var sendURL = ("https://io.adafruit.com/api/groups/"+uName+"/send.json?x-aio-key="+key+"&"+cName+"="+cVal);
httpGet(sendURL);
}

function enlightenME(knowledge)
{
console.log(knowledge.value);
iftttSend1(userName,aiokey,channelName,knowledge.value);
}

