
//@STATUS TODO :: The RunwayML library returns an inference of what we drew.
//Now able to save/load a crop



//Necessary for OSC communication with Wekinator:
import oscP5.*;
import netP5.*;



//------------ Display consequence / feedback when Inferencing is in progress
import interfascia.*;

GUIController c;
IFProgressBar p;
float percent = 0;
void setupUIProgressing(){
   
   c = new GUIController(this);
   p = new IFProgressBar(10, 10, 80);

   c.add(p);
   p.setProgress(percent);

}
void progressing(){
     p.setProgress(percent);
   if (percent < 1) {
      percent += 0.01;
   } else {
      percent = 0;
   }
}


// import Runway library
import com.runwayml.*;
// reference to runway instance
RunwayHTTP runway;

int verbose = 1;

PImage contentImage;
PImage runwayResult;

// status
String status = "Press 'c' to select content image";
String hostName = "192.168.2.44" ;
int serverPort = 8000;




void setupRunway()
{
  
  // setup Runway
  runway = new RunwayHTTP(this,hostName,serverPort);
  // update manually
  runway.setAutoUpdate(false);
}
  



String saveBasePath = "../out/";


OscP5 oscP5;
NetAddress dest;
 




int v = 0; // Verbose

int startX = 500;
int startY = 310;

//So we dont draw outside the box
int maxX = startX + (startX/2);
int maxY = startY + (startY/2);
int minX = startX - (startX/2);
int minY = startY - (startY/2);

float strokeSize = 3;
int strokeColor = 250;

void setupUI()
{
  initStatus();
  setupUIProgressing();
}

void setup() {
  
  
  // 3d in case we want to add a third pot...
  //size(displayWidth, displayHeight, P3D);
  size(1600, 768, P3D);
  setupUI();
  
  setupRunway();
  
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
 
 parseEtchDrawing();
 
 drawRunwayResult();
  
 counting++;
  //delay(1);
}

//Parse the Etch a Sketch Drawing
void parseEtchDrawing()
{
 //if (x > maxX || x < minX) mX =0; // we do not move in X, we reached the border
 //if (y > maxY || y < minY) mY =0; // we do not move in Y, we reached the border
 
 
  if (verbose > 1 )println("mX: "+ mX + ", mY: " + mY );
  
 //Defines border limits
 if (x > maxX && mX >0 ) mX =0; // we do not move in X, we reached the border
 if ( x < minX && mX < 0) mX =0; // we do not move in X, we reached the border
 
   if (y > maxY && mY >0 ) mY =0; // we do not move in X, we reached the border
 if ( y < minY && mY < 0) mY =0; // we do not move in X, we reached the border
 
 float divider = 1;
  //ADd the move to our new target XY
  if (mX != 0)
   x = x + mX/divider;
   if (mY != 0)
   y = y + mY/divider;
 
 //Draw our move
 if (mX != 0 || mY != 0)
  line(x,y,lX,lY);
  
///Keep track of the last position for our next move
  lX = x;
  lY = y;
  
  if (verbose > 1 )
  {
    println("lastX: "+ lX + ", lastY: " + lY );
    println("X: "+ x + ", Y: " + y );
    println("MinX: "+ minX + ", MaxX: " + maxX );
    println("MinY: "+ minY + ", MaxY: " + maxY );
  } 
}

void runwayInference(int portNum)
{
  runway = new RunwayHTTP(this,hostName,portNum);
  // update manually
  runway.setAutoUpdate(false);
    runway.query(contentImage,ModelUtils.IMAGE_FORMAT_JPG,"contentImage");  
}
void drawRunwayResult()
{
   // draw image received from Runway
  if(runwayResult != null){
    image(runwayResult,maxX+100,minY);
  }
}

String fnCurrent =   saveBasePath  + "etch-current.png";
 

//Load the current Image
void loadcontentImage()
{
  // saveCurrent();
  PImage outIMG ;
  outIMG = loadImage(fnCurrent);;
  contentImage = outIMG.get(minX,minY,maxX-minX,maxY-minY);
  contentImage.save(saveBasePath + "d-crop" + ".png");
 

}

//display the current image (to redraw on it too)
void displaycontentImage()
{
   image(contentImage, minX, minY);
}


//Would generate the inference preview
void inferencePreview(int painterID)
{ 
  print("starting INference preview prep...");
   saveCurrent();
   loadcontentImage();
   println("...Inference preview done");
   

}

//save the frame to current
void saveCurrent()
{
  saveFrame(fnCurrent);
  println("Current file saved");
  delay(1);
}
String currentPainter = "Picasso";
int bgR = 0; int bgG = 0; int bgB = 0;

void startInferencing(int _newServerPort,String _painter)
{
  progressing();
  setStatus("...");
  delay(5);
  setStatus("Inferencing started for painter:" + _painter);
  delay(1335);
  currentPainter = _painter;
   serverPort = _newServerPort;
   inferencePreview(0);
   runwayInference(serverPort);
   saveTlid();

   String _curStatus = "Current style is from : " + currentPainter;
  setStatus(_curStatus);
  
}



int picassoPort = 8000;
int monetPort = 8001;
int vangoghPort = 8002;
int KandinskyPort = 8003;
int PollockPort = 8004;
int xPort = 8005;

void keyPressed() {
  //
   if (key == 'i') {
    startInferencing(serverPort,currentPainter);
  }
  //Let us select the Painter style from the Inference Server (requires to start servers on these port on the ModelServer
  else  if (key == '1') {   setStatus("..."); startInferencing(picassoPort,"Picasso");  } 
  else  if (key == '2') {   setStatus("..."); startInferencing(monetPort,"Monet");  } 
  else  if (key == '3') {    startInferencing(vangoghPort,"Van Gogh");  } 
  else  if (key == '4') {    startInferencing(KandinskyPort,"Kandinsky");  } 
  else  if (key == '5') {    startInferencing(PollockPort,"Pollock");  } 
  else  if (key == 'x') {    startInferencing(xPort,"Experimental");  } 
  //
  
  //
  else 
   if (key == '7') {
     setStrokeColor(strokeColor++);
  } else 
   if (key == '6') {
     setStrokeColor(strokeColor--);
  }
  else 
   if (key == 'r') {
    resetCanvas();
  }
  else  if (key == 's') {    
   saveCurrent();
   saveFrame(saveBasePath + "etch-11-######.png");
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
     if (contentImage != null)  displaycontentImage();
     else {
       loadcontentImage();
       displaycontentImage();
       println("Current image was null, therefore loaded from last saved");
     }
  }
 
  //println(key);
  
  //loadcontentImage();
  // inferencePreview(1);
}

//save a frame with a unique timeline ID based on datetime
void saveTlid(){
   String fn = saveBasePath +  "etch-11-" + getDTTag() + ".png";
   saveFrame(fn);
   println("Saved Tlid image as: " + fn);
   delay(1);
  }
  

int parseOsc(float v1,float v1x,float v1y,float s3,float v2,float v2x,float v2y)
{
        v=2;
       if (v > 1)
       {
       print ("v1: " + v1 + ", " );
       print ("v1x:" + v1x);
       println ("v1y:" + v1y);
       }
       v=0;
       
      // mX = parseJoy(j1x,j1y);
       //mX = v1x + v1y;
       //mY = v2x + v2y;
       
       mX = v1;
       mY = v2;
       
  return 1;
}

//This is called automatically when OSC message is received
void oscEvent(OscMessage theOscMessage) {
 if (theOscMessage.checkAddrPattern("/wek/outputs")==true) {

     if(theOscMessage.checkTypetag("fffffff")) { //Now looking for 2 parameters
        // sendData(v1,j1valX,j1valY,s3,v2,j2valX,j2valY);
        float v1 = theOscMessage.get(0).floatValue(); //get this parameter
       float j1x = theOscMessage.get(1).floatValue(); //get this parameter
        float j1y = theOscMessage.get(2).floatValue(); //get 2nd parameter
       
        float s3 = theOscMessage.get(3).floatValue(); //
        
       //Second joystick
        float v2 = theOscMessage.get(4).floatValue(); //get 2nd parameter
        float j2x = theOscMessage.get(5).floatValue(); //get 2nd parameter
        float j2y = theOscMessage.get(6).floatValue(); //get 2nd parameter
       
       parseOsc(v1,j1x,j1y,s3,v2,j2x,j2y);
       
 
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





//--------------------------------------------
//-------------UTILs--------------------------
String getDTTag()
{
    
  int d = day();    // Values from 1 - 31
  int m = month();  // Values from 1 - 12
  int y = year();   // 2003, 2004, 2005, etc.
  int h = hour();
  int min = minute();
  return y + "-" + m + "-" + h + "-" + min;

}










//---------------------------------------------
//------------ UI ----------------------------


//----------------- STATUS--------------
 int statusPosX = 20;
 int statusHeight = 25;
 int statusPosY= 20;
 String curStatus = "";
 void initStatus(){
    statusPosY= height - statusHeight;
  }
    
void setStatus(String _curStatus){
  curStatus = _curStatus;
  textSize(32);
  fill(bgR, bgG, bgB);
  noStroke();
  rect(statusPosX, statusPosY - statusHeight * 1.5, width/2, statusHeight*2);
  fill(0,20,height -25);
  text( curStatus,statusPosX,statusPosY);
}


//-------------- STROKE

void setStrokeColor(int _color)
{
      strokeColor = _color;updateStrokeColor();
}






//
//Reset the canvas so we can draw again
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







//--------------------------------
//---------RUNWAY ML RELATED------


// this is called when new Runway data is available
void runwayDataEvent(JSONObject runwayData){
  // point the sketch data to the Runway incoming data 
  String base64ImageString = runwayData.getString("stylizedImage");
  // try to decode the image from
  try{
    runwayResult = ModelUtils.fromBase64(base64ImageString);
  }catch(Exception e){
    e.printStackTrace();
  }
  status = "received runway result";
}

// this is called each time Processing connects to Runway
// Runway sends information about the current model
public void runwayInfoEvent(JSONObject info){
  println(info);
}
// if anything goes wrong
public void runwayErrorEvent(String message){
  println(message);
}


//----------------- END RUNWAYML---------------
//---------------------------------------------
