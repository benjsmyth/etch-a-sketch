// Code originally from http://www.instructables.com/id/Arduino-to-Processing-Serial-Communication-withou/
// by https://www.instructables.com/member/thelostspore/
// Code was shared under public domain https://creativecommons.org/licenses/publicdomain/
// Extended by : J. Guillaume D.-Isabelle, 2021
// This code reads analog inputs from pins A0 and A1 and sends these values out via serial
// You can add or remove pins to read from, but be sure they are separated by commas, and print a
// newline character at the end of each loop()

int AnalogPin0 = A0; //Declare an integer variable, hooked up to analog pin 0
int AnalogPin1 = A4; //Declare an integer variable, hooked up to analog pin 1

//Define the range of the Remapping
int rLow = -500;
int rHigh= 500;

void setup() {
  Serial.begin(9600); //Begin Serial Communication with a baud rate of 9600
}

// Keep track of the previous value
int pA = 0;
int pB = 0;
int A = 0;
int B = 0;

void loop() {
   //New variables are declared to store the readings of the respective pins
  int Value1 = analogRead(AnalogPin0);
  int Value2 = analogRead(AnalogPin1);
 
  
  A = map(Value1, 0, 1023, rLow, rHigh);
  B = map(Value2, 0, 1023, rLow, rHigh);
  /*The Serial.print() function does not execute a "return" or a space
      Also, the "," character is essential for parsing the values,
      The comma is not necessary after the last variable.*/
  
  Serial.print(A, DEC); 
  Serial.print(",");
  Serial.print(B, DEC); 
  Serial.println();
  
  pA = A;
  pB = B;
  //delay(500); // For illustration purposes only. This will slow down your program if not removed 
}
