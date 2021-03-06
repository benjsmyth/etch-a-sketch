

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
 updateStrokeColor();
 updateStrokeSize();
}
void updateStrokeColor()
{
   stroke(strokeColor);  // white stroke
}

void updateStrokeSize()
{
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

 
 x = x + mX;
 y = y + mY;
  
 // rect(x,y, recSizeX, recSizeY);
  line(x,y,lX,lY);


  lX = x;
  lY = y;
  
  
  println("lastX: "+ lX + ", lastY: " + lY );
  println("X: "+ x + ", Y: " + y );
  
  counting++;
  //  println(counting);
  //delay(1);
  
}
String fnCurrent = "etch-current.png";
PImage currentImg ;
void loadCurrentImg()
{
  // saveCurrent();
     currentImg = loadImage(fnCurrent);
 
}

void displayCurrentImg()
{
   image(currentImg, 0, 0);
}

void inferencePreview(int painterID)
{ 
   saveCurrent();
  loadCurrentImg();

}

void saveCurrent()
{saveFrame(fnCurrent);
println("Current file saved");delay(250);
}



void keyPressed() {
   if (key == 'r') {
    resetCanvas();
  }
  else  if (key == 's') {    
   saveCurrent();
   saveFrame("etch-11-######.png");
  }else
   if (key == 't') {
     
      saveTlid();
  }else 
   if (key == '0') {
    strokeSize+=1;
    println(strokeSize);
    updateStrokeSize();
  }else 
   if (key == '9') {
    if (strokeSize > 1) strokeSize -= 1;
    updateStrokeSize();
    println(strokeSize);
  }else
   if (key == 'd') {
     if (currentImg != null)  displayCurrentImg();
     else {
       loadCurrentImg();
       displayCurrentImg();
       println("Current image was null and loaded");
     }
  }
 
  //println(key);
  
  //loadCurrentImg();
  // inferencePreview(1);
}
void saveTlid(){
   String fn = "etch-11-" + getDTTag() + ".png";
   saveFrame(fn);
   println("Saved Tlid image as: " + fn);
   delay(250);
  }
void resetCanvas()
{
  println("Resetting the canvas"); delay(100);
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
     
       if (v > 1)
       {
       println (j1x);
       println (j2x);
       }
       
      // mX = parseJoy(j1x,j1y);
       mX = j1x + j1y;
       mY = j2x + j2y;
       
      // strokeSize = s3;
       
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

String getDTTag()
{
    
  int d = day();    // Values from 1 - 31
  int m = month();  // Values from 1 - 12
  int y = year();   // 2003, 2004, 2005, etc.
  int h = hour();
  int min = minute();
  return y + "-" + m + "-" + h + "-" + min;

}
