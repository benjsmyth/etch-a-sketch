void setup() {
  // establish serial comms at a 9600 baud rate
  // which just means 9600 bits per second (fast enough!)
  Serial.begin(9600);
}
  
void loop() {
  // READ POT 1
  // grab the value from the analog port
  int theValue = analogRead(5);
  // theValue will run from 0 to 1023, so we need to remap it to 0->255
  int theMappedValue = map(theValue, 0, 1023, 0, 255);
  
  // write that value out the serial port for Processing to use
  Serial.write(theMappedValue);
 
 
  // NOW FOR POT 2
  theValue = analogRead(0);
  theMappedValue = map(theValue, 0, 1023, 0, 255);
  
  // write that value out the serial port for Processing to use
  Serial.write(theMappedValue);
 
  // NOTE: the second value written out the serial here is
  // going to be the first available in Processing
 
  delay(10);  // not sure if this is necessary, just
  // giving arduino a bit of a break
}
