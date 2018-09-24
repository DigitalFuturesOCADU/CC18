/*
 * Creation & Computation - Digital Futures, OCAD University
 * Kate Hartman / Nick Puckett
 * 
 * Make a Wavy Grid of shapes
 * User may specify how many in each direction and the margin around them
 * This method uses map() to space them evenly and a sin() wave 
 */



var totalX = 25;
var totalY = 40;
var margin = 20;
var circRad = 20;
var waveFactor = 50;

function setup()
{
createCanvas(800,600);
angleMode(DEGREES);

}


function draw()
{
	background(100);

	for (var x = 1; x<=totalX; x++)
	{
		for (var y = 1; y<=totalY; y++)
		{
			var gridX = map(x,1,totalX,margin,(width-margin)) ;
			var gridY = map(y,1,totalY,margin,(height-margin));

			gridX += sin(gridY)*waveFactor;

			fill(255,10,10,50);
			stroke(0,220,10);

			ellipse(gridX,gridY,circRad,circRad);

		}	


	}



}
