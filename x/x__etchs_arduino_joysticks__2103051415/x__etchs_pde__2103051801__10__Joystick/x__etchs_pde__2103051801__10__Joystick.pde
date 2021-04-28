

//Does receive the message from OSC but do not yet draw somehow the value received on the screen.


//Necessary for OSC communication with Wekinator:
import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress dest;
 




int v = 0; // Verbose

int startX = 512;
int startY = 300;

float strokeSize = 3;
int strokeColor = 250;
void setup() {
  
  
  // 3d in case we want to add a third pot...
  //size(displayWidth, displayHeight, P3D);
  size(1024, 768, P3D);

  
    //Initialize OSC communication
  oscP5 = new OscP5(this,12000); //listen for OSC messages on port 12000 (Wekinator default)
 // dest = new NetAddress("127.0.0.1",6448); //send messages back to Wekinator on port 6448, localhost (this machine) (default)
  
 
  // start w black bg
  background(0);
  stroke(strokeColor);  // white stroke
  strokeWeight(strokeSize);  // a little thicker
}
 

int counting = 0;

//Starting point of the drawing.
float x = startX;
float y = startY;
// keep track of old line positions
float lX = x;
float lY = y;


float mX = 0; //Move in X
float mY = 0; //Move in Y 


int recSizeX = 5;
int recSizeY = 5;




void draw() {
 


 parseEtchDrawing();
  
  counting++;
  //  println(counting);
  //delay(1);
  
}

void parseEtchDrawing()
{
   x = x + mX;
   y = y + mY;
  
 // rect(x,y, recSizeX, recSizeY);
  line(x,y,lX,lY);
  

  lX = x;
  lY = y;
  
  println("lastX: "+ lX + ", lastY: " + lY );
  println("X: "+ x + ", Y: " + y );
  
}

void keyPressed() {
  background(0);
  counting = -10;
  x=startX;
  y=startY;
  lX = x;
  lY = y;
}
 

//This is called automatically when OSC message is received
void oscEvent(OscMessage theOscMessage) {
 if (theOscMessage.checkAddrPattern("/wek/outputs")==true) {

     if(theOscMessage.checkTypetag("fffffff")) { //Now looking for 2 parameters
        float j1x = theOscMessage.get(0).floatValue(); //get this parameter
        float j1y = theOscMessage.get(1).floatValue(); //get 2nd parameter
        float j2x = theOscMessage.get(2).floatValue(); //get 2nd parameter
        float j2y = theOscMessage.get(3).floatValue(); //get 2nd parameter
        float s3 = theOscMessage.get(4).floatValue(); //get 2nd parameter
        float distance = theOscMessage.get(5).floatValue(); //get 2nd parameter
        float distance2 = theOscMessage.get(6).floatValue(); //get 2nd parameter
       
       println (j1x);
       println (j2x);
       
      // mX = parseJoy(j1x,j1y);
       mX = j1x + j1y;
       mY = j2x + j2y;
       
       strokeSize = s3;
       
       // float p3 = theOscMessage.get(2).floatValue(); //get third parameters
      //  x = x - p1 / 2;
      //  y = y - p2 /2;
      
    
 
 
       
   
 
      } else {
        println("Error: unexpected params type tag received by Processing");
      }
 }
}

//deprecating
float parseJoy(int _x,int _y)
{
 
 return 0;
}
