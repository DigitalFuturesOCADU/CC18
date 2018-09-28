<<<<<<< HEAD:P5examples/videoplay/sketch.js
=======
/*
Creation & Computation - Kate Hartman
Video Example
*/

>>>>>>> aa06f03edad8f78e2e2c728060fd90cbae21c2f8:P5examples/Video/sketch.js
var playing = false;
var fingers;
var button;


function setup() {
  getAudioContext().resume();
  // specify multiple formats for different browsers
  fingers = createVideo(['GoGoGloves.mp4']);
  button = createButton('play');
  button.mousePressed(toggleVid); // attach button listener
}

// plays or pauses the video depending on current state
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}