
/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett

Get info about the arrival times of Buses/Streetcars at a particular stop
execute this URL in the Browser to list all routes/tag codes
http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=ttc

http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=504  //**note change r=504 to r=<whatever tag code you get from the previous link>

*/

var sendURL = 'http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=ttc&r=504&s=6593';
var tSize = 500;

var minutesTilNext;

function setup()
{
createCanvas(800,500);
background(255,0,0);

}


function draw()
{


}

function mousePressed()
{
loadJSON(sendURL,somethingRandom);

}

function somethingRandom(ttcInfo)
{
	//console.log(ttcInfo.predictions);

	minutesTilNext = ttcInfo.predictions.direction.prediction[0].minutes;
	var m2 = ttcInfo.predictions.direction.prediction[1].minutes;

	background(255,0,0);
	fill(255);
	noStroke();
	textAlign(CENTER);
	textSize(tSize);

	text(minutesTilNext,width/2,(height/2)+(tSize/4));
	text(m2,width/2,(height/2)+(tSize/6));
}
