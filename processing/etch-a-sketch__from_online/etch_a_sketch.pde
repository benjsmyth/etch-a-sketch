// allows for serial comms from/to Processing
import processing.serial.*;
 
Serial myPort;  // The serial port
 
// a variable to store the incoming serial data to
int inByte1 = 0;
int inByte2 = 0;
 
// keep track of old line positions
float lastX = 0;
float lastY = 0;
 
void setup() {
  // 3d in case we want to add a third pot...
  size(displayWidth, displayHeight, P3D);
  // List all the available serial ports
  printArray(Serial.list());
 
  // FIGURE OUT WHAT PORT YOU NEED TO USE,
  // REPLACE THE VALUE IN THE [BRACKETS]
 
  // Open the port you are using at the rate you want:
  myPort = new Serial(this, Serial.list()[2], 9600);
 
  // start w black bg
  background(0);
  stroke(255);  // white stroke
  strokeWeight(2);  // a little thicker
}
 
void draw() {
  // are there at least 2 bytes avaiable? (2 pots)
  while (myPort.available () > 1) {
    // read in the last byte sent from arduino (pot 2)
    inByte1 = myPort.read();
    // and the next byte (first one was discarded)
    inByte2 = myPort.read();
  }
 
  // map these values so they are scaled to the sketch
  float x = map(inByte1, 0, 255, 0, width);
  float y = map(inByte2, 0, 255, 0, height);
 
  // draw a line
  line(x, y, lastX, lastY);
   
  // reset the lastX and Y
  lastX = x;
  lastY = y;
}
 
void keyPressed() {
  background(0);
}