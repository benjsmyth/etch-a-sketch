

//Does receive the message from OSC but do not yet draw somehow the value received on the screen.


//Necessary for OSC communication with Wekinator:
import oscP5.*;
import netP5.*;
OscP5 oscP5;
NetAddress dest;
 
// a variable to store the incoming serial data to
int inByte1 = 0;
int inByte2 = 0;
 
// keep track of old line positions
float lastX = 0;
float lastY = 0;
int v = 0;

void setup() {
  
  
  // 3d in case we want to add a third pot...
  //size(displayWidth, displayHeight, P3D);
  size(1000, 1000, P3D);

  
    //Initialize OSC communication
  oscP5 = new OscP5(this,12000); //listen for OSC messages on port 12000 (Wekinator default)
 // dest = new NetAddress("127.0.0.1",6448); //send messages back to Wekinator on port 6448, localhost (this machine) (default)
  
 
  // start w black bg
  background(0);
  stroke(255);  // white stroke
  strokeWeight(2);  // a little thicker
}
int min = 2; //starts there
int max = 100;
int counting = 0;
int d = 333;
float x = 500;
float y = 500;
float vx =0;
float vy =0;
void draw() {
 
  float tstX = 100;
  float tstY = 90;
  float tstXl = 177;
  float tstYl = 222;
  
  boolean test = false;
  if (test)
  {
  line(tstX,tstY,tstXl,tstYl);
 
  line(0,10,10,20);
  line(10,20,55,77);
  }
  rect(x-vx,y-vy, 30, 30);
    
    counting++;
  //  println(counting);
  delay(1);
  
}
 
void keyPressed() {
  background(0);
  counting = -10;
  

}


//This is called automatically when OSC message is received
void oscEvent(OscMessage theOscMessage) {
 if (theOscMessage.checkAddrPattern("/wek/outputs")==true) {
     if(theOscMessage.checkTypetag("ff")) { //Now looking for 2 parameters
        float p1 = theOscMessage.get(0).floatValue(); //get this parameter
        float p2 = theOscMessage.get(1).floatValue(); //get 2nd parameter
       // float p3 = theOscMessage.get(2).floatValue(); //get third parameters
      //  x = x - p1 / 2;
      //  y = y - p2 /2;
      vx = p1;
      vy = p2;
       // updateDrums(p1, p2, p3);
        
        println("VelocityX: "+ p1 + ", Velocity Y: " + p2 +"  -> Received new params value from Wekinator");  
        p1 = p1-200;
        p2 = p2-200;
       
        line(p1,p2,lastX+10,lastY+10);
       // line(random(p1),random(p2),random(lastX),random(lastY));
        lastX = p1;
        lastY = p2;
        
        println("----------------------");
 
        line(0,10,110,120);
        //draw();
      } else {
        println("Error: unexpected params type tag received by Processing");
      }
 }
}
