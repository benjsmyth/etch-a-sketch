
// keep track of old line positions
float lastX = 0;
float lastY = 0;

// keep track of old line positions
float x = 1;
float y = 1;


void setup() {
  // 3d in case we want to add a third pot...
  size(displayWidth, displayHeight, P3D);
 
  // start w black bg
  background(0);
  stroke(255);  // white stroke
  strokeWeight(2);  // a little thicker
}
float ry = 5;
float rx = 3;
float my = 250;
float mx = 500;
float ryr = 8;

void draw() {
  
   x++;
   y++;
   y++;
   if (x > 35) {
     y--;
     y--;
     y--;
   }
   if (x > 35 && y < 10 )
   {
     x++;
     y++;
     y++;
     y++;
   }
   if ( y < 10 )
   {
     
     y++;
     y++;
     y++;
   
   }
    float fy = random(ry);
     y+= fy;
     float fx = random(rx);
     x+=fx;
     
     if (y > my) 
     {
       fy = random(ryr);
       y -= fy;
     }
     
     if (x > mx)
     {
       fy = random(ry*2);
       y+= fy; 
     }
     
  // draw a line
  
  line(x, y, lastX, lastY);
   
  // reset the lastX and Y
  lastX = x;
  lastY = y;
}
