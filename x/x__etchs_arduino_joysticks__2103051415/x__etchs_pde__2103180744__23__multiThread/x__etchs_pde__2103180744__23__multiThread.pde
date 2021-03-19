/*
* Etch a SketchAI 
* By J.Guillaume D.-Isabelle, 2021
*/
//@STATUS DONE :: The RunwayML library returns an inference of what we drew.
//Now able to save/load a crop



//Necessary for OSC communication with Wekinator:
import oscP5.*;
import netP5.*;



//------------ Display consequence / feedback when Inferencing is in progress
//TODO Find a UI lib to build up feedback



// import Runway library
import com.runwayml.*;
// reference to runway instance
RunwayHTTP runway;

int verbose = 1;

PImage contentImage;
PImage runwayResult;

// status
String status = "Press 'c' to select content image";
String hostName = "192.168.2.132" ;
int serverPort = 8000;




void setupRunway()
{
  
  
  surface.setTitle("Initializing...Model Server...");
  // setup Runway
  runway = new RunwayHTTP(this,hostName,serverPort);
  // update manually
  runway.setAutoUpdate(false);
  surface.setTitle("Initializing...Model Server...DONE");
}
  



String saveBasePath = "../out/";


OscP5 oscP5;
NetAddress dest;
 




int v = 0; // Verbose


float strokeSize = 3;
int strokeColor = 250;
int sR = 250;
int sG = 250;
int sB = 250;


void setupUI()
{
  initStatus();
  initMode();
  setMode("n");
  //setupUIProgressing();
}

int startX = 700;
int startY = 360;

//So we dont draw outside the box
int maxX = startX + (startX/2);
int maxY = startY + (startY/2);
int minX = startX - (startX/2);
int minY = startY - (startY/2);



int cX = 860; int cY = 500; // New canvas desired size
int mgX = 30; int mgY = 50; //new Desired Margin around each image



void setupCanvasSize()
{
// Trying to get that relative to the whole canvas size
  //Run after the size of surface is def
  //@STCStatus : NOT WORKING - I have to find another way to increase the canvas size
  maxX =  mgX + cX;
  maxY =  mgY + cY;
  minX =  mgX;
  minY =  mgY;
  
  startX = mgX + cX / 2;
  startY = mgY + cY / 2;
  
}

void setup() {
  
  
  // 3d in case we want to add a third pot...
  //size(displayWidth, displayHeight, P3D);
  size(1900, 700, P3D);
  setupCanvasSize();
  surface.setTitle("Initializing...");
  setupUI();
  
  
  setupRunway();
  
    //Initialize OSC communication
  oscP5 = new OscP5(this,12000); //listen for OSC messages on port 12000 (Wekinator default)
 // dest = new NetAddress("127.0.0.1",6448); //send messages back to Wekinator on port 6448, localhost (this machine) (default)
  
 
  // start w black bg
  clearBG();

  surface.setTitle("Etch a Sketch AI - EtchAI Prototype no 1");
}

void updateUI() {
    
  updateBG();  
  updateStrokeColor();
  updateStrokeSize();
  
}

void clearBG() {background(bgR,bgG,bgB);
updateUI();
}
void updateBG() {}

void updateStrokeColor()
{
   //stroke(strokeColor);  // white stroke
   stroke(sR,sG,sB);
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

boolean updating = false;
String curStatus = "";
String pStatus = "-";
void draw() {
 
 
 if (pStatus != curStatus)  
 {
   updateStatus();
   pStatus = curStatus;
   
 }
 
 parseEtchDrawing();
 
 if (updating) updateContentImage();
 
 drawRunwayResult();
  
 updateUI();
 
}

//Parse the Etch a Sketch Drawing
void parseEtchDrawing()
{

 
 
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
  contentImage = loadImage("content.png");;
  //contentImage = outIMG.get(minX,minY,maxX-minX,maxY-minY);
  contentImage.save(saveBasePath + "d-crop" + ".png");
  contentImage.save("canvas" + ".png");
 

}
void saveCanvas(PImage _canvas)
{
  _canvas.save("canvas" + ".png");
}
//display the current image (to redraw on it too)
void displaycontentImage()
{
   image(contentImage, minX, minY);
}


//Would generate the inference preview
void inferencePreview(int painterID)
{ 
  updating = true;
    print("starting INference preview prep...");
   // saveCurrent();
   // loadcontentImage();
   // updateContentImage();
    saveContentImage();
    println("...Inference preview starting");

}



void updateContentImage(){
   PImage all ; 
   all = get();
  contentImage = all.get(minX,minY,maxX-minX,maxY-minY);
  //An object image I can 
  
}
void saveContentImage()
{
   contentImage.save("content.png");
}
void saveResult(){ if (runwayResult != null) runwayResult.save("result.png");}

//save the frame to current
void saveCurrent()
{ 
  saveFrame(fnCurrent);
  println("Current file saved");
  
}
void saveAll()
{
  saveFrame(fnCurrent);
  println("Current file saved (all the canvas: " + fnCurrent);
}
String currentPainter = "Picasso";
int bgR =55; int bgG = 55; int bgB = 55;

void wrapRunwayInfering()
{
  
   runwayInference(serverPort);
   
   
   if (doAutoSaveTimeline)
   {     
     saveTlid();
   }
   
  curStatus = "Current style is from : " + currentPainter;
  
  thread("updatingDone");
}
void updatingDone()
{
  delay(25);
  updating = false;
}
void startInferencing(int _newServerPort,String _painter)
{
  
  curStatus = "Inferencing started (" + _painter + " )";
    
   currentPainter = _painter;
   serverPort = _newServerPort;
   inferencePreview(0);
   
   thread("wrapRunwayInfering");
  
}

boolean doAutoSaveTimeline = true;

int picassoPort = 8000;
char picassoKey = '1';
int kandinskyPort = 8001;
char kandinskyKey = '2';
int monetPort = 8002;
char monetKey='3';
int vangoghPort = 8003;
char vangoghKey = '4';
int pollockPort = 8004;
char pollockKey = '5';


int xPort = 8005;
boolean modeN = true;
boolean modeC = false;
boolean modeA = false;
boolean modeS = false;
void setNormalMode() {setMode("-");modeN = true;println("Normal Mode");modeS=false;modeA=false;modeC=false;}
void keyPressed() {
  //
  if (keyCode == CONTROL ) {  modeC = !modeC;modeN=!modeC; modeA= false;modeS=false;if (modeC) setMode("C");else {setNormalMode();} }   
  if (keyCode == ALT ) {  modeA = !modeA;modeN=!modeA;modeC=false;modeS=false; if (modeA) setMode("A");else {setNormalMode();} }    
  if (keyCode == SHIFT ) {  modeS = !modeS;modeN=!modeS;modeC=false;modeA=false; if (modeS) setMode("S");else {setNormalMode();} } 
  if (keyCode == TAB) setNormalMode();
 // if (!modeS && !modeA && !modeC)  modeN=true;setMode("-");
  
  
  println("modeC: " + modeC + ", modeS:" + modeS + ", modeA: "  + modeA + ", modeN: " + modeN);
  
  //-----------------
  //----- Commands Available in Any Mode
        if (key == picassoKey) { startInferencing(picassoPort,"Picasso");  } 
  else  if (key == monetKey) { startInferencing(monetPort,"Monet");  } 
  else  if (key == vangoghKey) { startInferencing(vangoghPort,"Van Gogh");  } 
  else  if (key == kandinskyKey) { startInferencing(kandinskyPort,"Kandinsky");  } 
  else  if (key == pollockKey) { startInferencing(pollockPort,"pollock");  } 
  else  if (key == '6') { startInferencing(xPort,"Experimental");  } 
  
  else  if (key == 'p') { xCopyInferenceToCanvas();  } 
   
  
  //***************************************************
  //--------- Commands available in Normal Mode
  
  if (modeN) {
   if (key == 'i' || key== ' ') {
    startInferencing(serverPort,currentPainter);
  }
  
  //Let us select the Painter style from the Inference Server (requires to start servers on these port on the ModelServer
  
  //
  else 
   if (key == 'r') {
    resetCanvas();
  }
  else  if (key == 's') {   
    print("Saving bunch of stuff...");
   saveCurrent();
   saveFrame(saveBasePath + "etch-11-######.png");
   saveResult();
   saveContentImage();
   println("...done");
  }else
   if (key == 't') {
     
      saveTlid();
  }else 
   
     if (key == 'd') {
       //if (contentImage != null)  displaycontentImage();
       //else {
         loadcontentImage();
         displaycontentImage();
         println("Current image was null, therefore loaded from last saved");
       //}
    }
  } 
  
  
  
  //----------------------------------------------------
  //----- Commands in Mode S (Toggle using  Shift)  ----
  else if (modeS)
  {
    //Mode S Shortcuts...
    //...
    
     if (key == 'r') {
       bgR++;bgR++;bgR++;bgR++;bgR++;bgR++;bgR++;bgR++;bgR++;bgR++;
       println("bg Red now: " + bgR);
       resetCanvas();
    } else if (key == 'g') {
       bgG++;bgG++;bgG++;bgG++;bgG++;bgG++;bgG++;bgG++;bgG++;bgG++;
       println("bg Green now: " + bgG);
       resetCanvas();
    } else if (key == 'b') {
       bgB++;bgB++;bgB++;bgB++;bgB++;bgB++;bgB++;bgB++;bgB++;bgB++;
       println("bg Blue now: " + bgB);
       resetCanvas();
    } else 
    
    if (key == 's') {
     setStrokeColor(strokeColor++);
    } else    if (key == 'n') {
     setStrokeColor(strokeColor--);
  } else 
  if (key == 'k') {
    strokeSize+=1;
    println(strokeSize);
    updateStrokeSize();
  }else 
   if (key == 'x') {
      if (strokeSize > 1) strokeSize -= 1;
      updateStrokeSize();
      println(strokeSize);
    }
    
  }
  
  //-----------------------------------------------------------
  //-------------- Commands in Mode A (Toggle using  ALT)  ----
   else if (modeA)
  {
    //Mode A Shortcuts...
    //...
    
     if (key == 'r') {
       bgR--;bgR--;bgR--;bgR--;bgR--;bgR--;bgR--;bgR--;bgR--;bgR--;
       println("bg Red now: " + bgR);
       resetCanvas();
    } else 
     if (key == 'g') {
       bgG--;bgG--;bgG--;bgG--;bgG--;bgG--;bgG--;bgG--;bgG--;bgG--; 
       println("bg Green now: " + bgG);
       resetCanvas();
    }else 
     if (key == 'b') {
       bgB--;bgB--;bgB--;bgB--;bgB--;bgB--;bgB--;bgB--;bgB--;bgB--; 
       println("bg Blue now: " + bgB);
       resetCanvas();
    }
    
    else if (key == 't') {toogleDoAutoSaveTimeline (); }
  }
  
  //-----------------------------------------------------------
  //-------------- Commands in Mode C (Toggle using CTRL)  ----
   else if (modeC)
  {
    //Mode C Shortcuts...
    //...
  }
  
  //println(key);
   
}







void xCopyInferenceToCanvas()
{
  if (runwayResult == null) runwayResult = loadImage("result.png");
  contentImage = runwayResult;
  displaycontentImage();
  saveTlid();
}







void toogleDoAutoSaveTimeline() {doAutoSaveTimeline = !doAutoSaveTimeline;
String msg = "doAutoSaveTimeline now: " +doAutoSaveTimeline;
println(msg);
setStatus(msg);
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
       // v=2;
       if (v > 1)
       {
       print ("v1: " + v1 + ", " );
       print ("v1x:" + v1x);
       println ("v1y:" + v1y);
       }
      // v=0;

       
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
  
  int sec = second();
  return y + "-" + nf(m,2) + "-" + nf(h,2) + "-" + nf(min,2) + "-" + nf(sec,2);

}










//---------------------------------------------
//------------ UI ----------------------------
//---------------- Mode -------------------
 int modePosX = 0;
 int modeHeight = 25;
 int modePosY= 20;
 String curmode = "-";
 void initMode(){
    modePosY=  modeHeight;
    modePosX = width - 100;
  }
    
void setMode(String _curmode){
  curmode = _curmode;
  textSize(26);
  fill(bgR, bgG, bgB);
  noStroke();
  rect(modePosX, modePosY - modeHeight * 1.5, 55, 55);
  fill(255);
  text( curmode,modePosX,modePosY);
}
//----------------- STATUS--------------
 int statusPosX = 20;
 int statusHeight = 25;
 int statusPosY= 20;

 void initStatus(){
    statusPosY= height - statusHeight;
  }

int statusR = 244;int statusG = 200; int statusB = 188;
void setStatus(String _curStatus){
  curStatus = _curStatus;

}
void updateStatus()
{
  textSize(32);
  fill(statusR,statusG,statusB);
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
  println("Resetting the canvas"); 
   
  counting = -10;
  x=startX;
  y=startY;
  lX = x;
  lY = y;
  
  
  updateUI();
  
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
