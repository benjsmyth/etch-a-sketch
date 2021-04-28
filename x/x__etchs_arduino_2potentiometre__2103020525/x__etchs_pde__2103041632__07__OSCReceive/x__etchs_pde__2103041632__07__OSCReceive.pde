

//Does receive the message from OSC but do not yet draw somehow the value received on the screen.


//Necessary for OSC communication with Wekinator:
import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress dest;
 
// a variable to store the incoming serial data to
int inByte1 = 0;
int inByte2 = 0;
 


int v = 0; // Verbose

int startX = 600;
int startY = 300;

int strokeSize = 3;
int strokeColor = 250;
void setup() {
  
  
  // 3d in case we want to add a third pot...
  //size(displayWidth, displayHeight, P3D);
  size(1280, 768, P3D);

  
    //Initialize OSC communication
  oscP5 = new OscP5(this,12000); //listen for OSC messages on port 12000 (Wekinator default)
 // dest = new NetAddress("127.0.0.1",6448); //send messages back to Wekinator on port 6448, localhost (this machine) (default)
  
 
  // start w black bg
  background(0);
  stroke(strokeColor);  // white stroke
  strokeWeight(strokeSize);  // a little thicker
}
//PROBABLY TRASH those
int min = 2; //starts there
int max = 100;
int d = 333;


int counting = 0;

//Starting point of the drawing.
float x = startX;
float y = startY;
// keep track of old line positions
float lastX = x;
float lastY = y;


float vx =0;
float vy =0;
//When we have negative or positive velocity, what is our move going to be ?
float vNeg = -15;
float vPos = 15;

int recSizeX = 5;
int recSizeY = 5;

//minimum range where we consider accelleration was a move
int minXp = 1;
int minXn = -1;
int minYp = 1;
int minYn = -1;


void draw() {
 

  
  boolean test = false;
  if (test)
  {
    float tstX = 100;
    float tstY = 90;
    float tstXl = 177;
    float tstYl = 222;
    line(tstX,tstY,tstXl,tstYl);
     
    line(0,10,10,20);
    line(10,20,55,77);
  }

 

  //change our XY value according to received velocities
  if (vx < 0)
    x = x-vx;
    else x = x+vx;
  if (vy < 0)
    y = y-vy;
  else y = y+vy;
  
 // rect(x,y, recSizeX, recSizeY);
  line(x,y,lastX,lastY);


  lastX = x;
  lastY = y;
  
  
  println("lastX: "+ lastX + ", lastY: " + lastY );
  println("X: "+ x + ", Y: " + y );
  println("VX: "+ vx + ", VY: " + vy );
  counting++;
  //  println(counting);
  //delay(1);
  
}

void keyPressed() {
  background(0);
  counting = -10;
  x=startX;
  y=startY;

}

int minInRange  = -500;
int maxInRange = 500;
int minOutRange = 50;
int maxOutRange = -50;

//This is called automatically when OSC message is received
void oscEvent(OscMessage theOscMessage) {
 if (theOscMessage.checkAddrPattern("/wek/outputs")==true) {
   int vOri =v;
   v=2;
   if (v > 1 )
   {
     println("----------------OSC Message:-----------------------------_");
     println(theOscMessage);
     println("----------------:OSC Message-----------------------------_");
   
   }
   v=vOri;
   
     if(theOscMessage.checkTypetag("ff")) { //Now looking for 2 parameters
        float p1 = theOscMessage.get(0).floatValue(); //get this parameter
        float p2 = theOscMessage.get(1).floatValue(); //get 2nd parameter
       // float p3 = theOscMessage.get(2).floatValue(); //get third parameters
      //  x = x - p1 / 2;
      //  y = y - p2 /2;
      
     
     
      vx = 0;
      vy = 0;

      
      
      //Uh ! What am I trying to achieve in here ??
     // if (p1 > minXp ) vx = map(p1,0,500,0,50);
    //  if (p1 < minXn ) vx = map(p1,0,-500,0,-50);
    //  if (p2 > minYp ) vy = map(p2,0,500,0,50);
    //  if (p2 < minYn ) vy = map(p2,0,500,0,-50);
    //I think I am trying to remap to an acceptable movement in 4 possible directions.
    vx = map(p1,minInRange,maxInRange,minOutRange,maxOutRange);
    vy = map(p2,minInRange,maxInRange,minOutRange,maxOutRange);
    
        v=1;
    if (v > 0)    println("VelocityX: "+ p1 + ", Velocity Y: " + p2 +"  -> Received new params value from Wekinator");  
      
       
   
 
      } else {
        println("Error: unexpected params type tag received by Processing");
      }
 }
}
