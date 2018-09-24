var lineWidth = 2;
var textOffset = 10;
var fontSize;

function setup() 
{
  createCanvas(windowWidth, windowHeight);
}

function draw() 
{
fontSize = height/35;//adjust the size of the font based on the height of the window

background(255);	//white background
stroke(0);			//black lines
strokeWeight(lineWidth);  // set the width for the lines

line(width/2,0,width/2,height);  // draw horizontal line across the middle of the canvas
line(0,height/2,width,height/2); // draw a vertical line across the middle of the canvas

stroke(255,0,0);				//change the stroke color to red
strokeWeight(lineWidth/2);		//make the stroke weight half the width of the other lines
line(0,mouseY,width,mouseY);	// draw horizontal line  at the Y position of the cursor
line(mouseX,0,mouseX,height);	// draw vertical line  at the X position of the cursor




fill(50);												//set the color for the text
noStroke();												//turn off stroke as it makes the text overly bold
textSize(fontSize);										//set the size of the text to be drawn
textAlign(LEFT);										//set the alignment to be left justified
text("0 , 0",textOffset,textOffset+fontSize);  			//mark the coord of the top left corner
text(("0 , "+height),textOffset,height - textOffset); 	//mark the coord of the bottom left corner

textAlign(RIGHT);													//switch the alignment to right justified
text((width+", 0"),width-textOffset,textOffset+fontSize);			//mark the coord of the top right corner
text((width+" , "+height),width-textOffset,height - textOffset);	//mark the coord of the bottom right corner

textAlign(CENTER);											//set the alignment to center justified
text(width/2+"  "+height/2,width/2,height/2-textOffset);	//draw the coordinates of the center of the canvas

fill(255,0,0);												//switch the fill color to red
text(mouseX+" , "+mouseY,mouseX,mouseY);					//draw the coordinates of the cursor at the cursor
//



}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
  
}