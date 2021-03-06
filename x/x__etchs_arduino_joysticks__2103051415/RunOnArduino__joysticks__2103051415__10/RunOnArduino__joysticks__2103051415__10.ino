

/*
2 Joysticks : 1 for moving up down, 1 for left - right
1 distance mesurement for Pen size
1 button for something
*/

int j2pinX = A3;
int j2pinY = A4;

int j1pinX = A2;
int j1pinY = A1;

int s3 = 0 ; //a temp value for other signal
int distance = 3; // temp value before we implement distance mesurement
int distance2 = 0; 

void setup() {
  // put your setup code here, to run once:

 Serial.begin(9600); //Begin Serial Communication with a baud rate of 9600
}
//Remapping range
int mapValue = 64;
//A Range where we are neutral
int rangeValue = mapValue / 2;

int mapXmin = mapValue * -1;
int mapXmax = mapValue;
int mapYmin = mapValue * -1;
int mapYmax = mapValue;
int minRangeNeutral = rangeValue * -1;
int maxRangeNeutral = rangeValue;
boolean remapping = true;
void loop() {
  // put your main code here, to run repeatedly:

  
  int j1valX = 
      analogRead(j1pinX) ; 
      
  int j1valY = 
      analogRead(j1pinY) ; 
  
  int j2valX = 
      analogRead(j2pinX) ; 
      
  int j2valY = 
      analogRead(j2pinY) ; 

//Remapping ??
      if (remapping)
      {
        
         j1valX = map(
            j1valX,0,1023,mapXmin,mapXmax
             );  
         j1valY = map(
            j1valY,0,1023,mapXmin,mapXmax
             );
         j2valX = map(
            j2valX,0,1023,mapXmin,mapXmax
             );  
         j2valY = map(
            j2valY,0,1023,mapXmin,mapXmax
             );

      
      }


      
      //Create a neutral value for very low value (it oscillate a bit)
//if (j1valX > minRangeNeutral && j1valX < maxRangeNeutral) j1valX = 0;
//else if (j1valX > rangeValue) j1valX = 1;
//else j1valX = -1;

j1valX = parseRange(j1valX);
j1valY = parseRange(j1valY);

j2valX = parseRange(j2valX);
j2valY = parseRange(j2valY);
 


    Serial.print(j1valX, DEC); 
    Serial.print(",");
    Serial.print(j1valY, DEC); 
    Serial.print(",");
    Serial.print(j2valX, DEC); 
    Serial.print(",");
    Serial.print(j2valY, DEC); 
    Serial.print(",");
    Serial.print(s3, DEC); 
    Serial.print(",");
    Serial.print(distance, DEC); 
    Serial.print(",");
    Serial.print(distance2, DEC); 
    Serial.println();
  
}

int parseRange(int val)
{


    if (val > minRangeNeutral && val < maxRangeNeutral) return 0;
     else 
     if (val > rangeValue) return 1;
      else return -1;

}
