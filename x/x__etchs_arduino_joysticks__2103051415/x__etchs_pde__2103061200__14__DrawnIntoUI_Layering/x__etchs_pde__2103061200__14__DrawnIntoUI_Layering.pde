
//@STATUS FAILED :
//v13: As soon as there is a line drawn, the bg dissapears
//@NextStep is retry with BG Img and Layers


//Necessary for OSC communication with Wekinator:
import oscP5.*;
int receivingPort= 12000;
import netP5.*;



OscP5 oscP5;
NetAddress dest;
 
//---------------UI

int dPX = 150;
int dPY = 50;
int dSX = 500;
int dSY = 450;

int iPX = dPX+dSX+dPX;
int iPY = dPY;
int iSX = dSX;
int iSY = dSY;
//-----------------------



int v = 0; // Verbose

int startX = 512;
int startY = 300;

float strokeSize = 3;
int strokeColor = 250;


String uiBgfn = "../../etch-bg-ui-frame.png";
PImage bgUi;

PGraphics[] layers = new PGraphics[3];
int drawingLayerId = 2;

void oldUI()
{
  background(0);
}
void setupUI()
{
  bgUi = loadImage(uiBgfn);
  background(bgUi);
}
void drawWorkAreas()
{
  layers[1].rect(dPX, dPY, dSX, dSY);
  layers[1].rect(iPX, iPY, iSX, iSY);
}
void setupLayers()
{
    for (int i = 0; i < layers.length; i++) {
    layers[i] = createGraphics(width, height);
  }
}

boolean enableNewUI =true;
void setup() {
  
  
  // 3d in case we want to add a third pot...
  //size(displayWidth, displayHeight, P3D);
  size(1400, 768, P3D);
  
  
  
    //Initialize OSC communication
  oscP5 = new OscP5(this,receivingPort); //listen for OSC messages on port 12000 (Wekinator default)
  // dest = new NetAddress("127.0.0.1",6448); //send messages back to Wekinator on port 6448, localhost (this machine) (default)
  
 
  // start w black bg
 if (enableNewUI) setupUI();
 else oldUI();
 
  setupLayers();
  
}

void beginDrawLayers()
{
   for (int i = 0; i < layers.length; i++) {
    layers[i].beginDraw();
  } 
}
void updateStrokeColor()
{
   layers[drawingLayerId].stroke(strokeColor);  // white stroke
}

void updateStrokeSize()
{
 layers[drawingLayerId].strokeWeight(strokeSize);  // a little thicker
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


boolean uiIsDrawn = false;

void draw() {
 if (!uiIsDrawn){
   beginDrawLayers();
 uiIsDrawn = true;
 }
  
 updateStrokeColor();
 updateStrokeSize();
 
  
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
  layers[drawingLayerId].line(x,y,lX,lY);
  layers[drawingLayerId-1].line(x,y,lX,lY);

  lX = x;
  lY = y;
  
  println("lastX: "+ lX + ", lastY: " + lY );
  println("X: "+ x + ", Y: " + y );
  
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
{
  saveFrame(fnCurrent);
  println("Current file saved");
  delay(250);
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
