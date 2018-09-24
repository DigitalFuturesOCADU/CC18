



function setup()
{
createCanvas(800,500);
}


function draw()
{
background(100);


	for(var theCount=100;theCount>=1;theCount-=2)
	{
	fill(255,0,0);
	ellipse(theCount*10,100,theCount,theCount);


	}



}
